import { Check, Copy } from "lucide-react";
import { useState } from "react";

export default function CodeBlock({
  code,
  className,
}: {
  code: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="relative group py-1">
      {/* Copy button */}
      <button
        onClick={handleCopy}
        className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition text-secondary-foreground rounded flex items-center justify-center"
      >
        {copied ? <Check size={20} /> : <Copy size={20} />}
      </button>

      <pre className="bg-gray-200 dark:bg-zinc-800 text-secondary-foreground p-3 rounded-lg overflow-x-auto">
        <code className={className}>{code}</code>
      </pre>
    </div>
  );
}
