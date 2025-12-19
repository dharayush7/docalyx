import { messages } from "@/generated/prisma/client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import "highlight.js/styles/github.css";
import CodeBlock from "./code-block";
import {
  cn,
  fixMarkdown,
  formatDateTime,
  getTextFromReactNode,
} from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import Markdown from "react-markdown";

export default function AiChatCard({ message }: { message: messages }) {
  const [copied, setCopied] = useState(false);
  const isMobile = useIsMobile();

  async function handleCopy() {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="md:max-w-175 max-w-full group/chat">
      <div className="rounded-lg">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            a: ({ node, ...props }) => (
              <a {...props} target="_blank" rel="noopener noreferrer" />
            ),
            code({ className, children, ...props }) {
              const isBlock = Boolean(className);
              const code = String(children).replace(/\n$/, "");

              if (!isBlock) {
                console.log(props);
              }
              if (!isBlock) {
                return (
                  <code className="bg-gray-200 dark:bg-zinc-800 px-1 rounded text-sm">
                    {code}
                  </code>
                );
              }

              return <CodeBlock code={getTextFromReactNode(children)} />;
            },
            p: ({ children }) => (
              <p className="mb-3 leading-relaxed text-lg">{children}</p>
            ),
            ul: ({ children }) => (
              <ul className="mb-3 ml-4 list-disc space-y-1">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="mb-3 ml-4 list-decimal space-y-1">{children}</ol>
            ),
            li: ({ children }) => <li>{children}</li>,
            h1: ({ children }) => (
              <h1 className="text-3xl mb-3 font-bold">{children}</h1>
            ),
            h2: ({ children }) => (
              <h1 className="text-2xl mb-2 font-bold">{children}</h1>
            ),
            h3: ({ children }) => (
              <h1 className="text-xl mb-2 font-bold">{children}</h1>
            ),
            table: ({ children }) => (
              <table className="mb-3 table-fixed text-sm sm:text-base md:text-lg overflow-x-scroll  w-full">
                {children}
              </table>
            ),
            th: ({ children }) => (
              <th className="border-b-2 border-gray-300 dark:border-zinc-500 py-2 gap-2">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="py-2 pr-2 last:pr-0 w-full text-center">
                {children}
              </td>
            ),
            tr: ({ children }) => (
              <tr className="border-b border-gray-300 dark:border-zinc-600 last:border-b-0">
                {children}
              </tr>
            ),
            thead: ({ children }) => <thead className="">{children}</thead>,
            tbody: ({ children }) => <tbody className="">{children}</tbody>,
            hr: ({ children }) => (
              <hr className="my-6 border-gray-300 dark:border-zinc-700 " />
            ),
          }}
        >
          {fixMarkdown(message.content)}
        </ReactMarkdown>
      </div>
      <div className="flex justify-between px-2 text-xs font-medium text-muted-foreground">
        <button
          onClick={handleCopy}
          className={cn(
            "opacity-0 group-hover/chat:opacity-100 transition text-secondary-foreground rounded flex items-center justify-center",
            isMobile && "opacity-100"
          )}
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
        <p>{formatDateTime(message.created_at)}</p>
      </div>
    </div>
  );
}
