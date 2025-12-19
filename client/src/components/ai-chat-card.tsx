import { messages } from "@/generated/prisma/client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

import "highlight.js/styles/github.css";
import CodeBlock from "./code-block";
import { formatDateTime } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

export default function AiChatCard({ message }: { message: messages }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="md:max-w-175 max-w-full">
      <div className="rounded-lg">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            a: ({ node, ...props }) => (
              <a {...props} target="_blank" rel="noopener noreferrer" />
            ),
            code({ className, children, ...props }) {
              const codeText = String(children).replace(/\n$/, "");
              return <CodeBlock code={codeText} />;
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
          }}
        >
          {message.content}
        </ReactMarkdown>
      </div>
      <div className="flex group justify-between px-2 text-xs font-medium text-muted-foreground">
        <button
          onClick={handleCopy}
          className="opacity-0 group-hover:opacity-100 transition text-secondary-foreground rounded flex items-center justify-center"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
        <p>{formatDateTime(message.created_at)}</p>
      </div>
    </div>
  );
}
