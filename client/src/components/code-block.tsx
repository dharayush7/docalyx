import { useIsMobile } from "@/hooks/use-mobile";
import { cn, getTextFromReactNode } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import React, { useState } from "react";

export default function CodeBlock({
  code,
  className,
}: {
  code: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const isMobile = useIsMobile();

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="relative group py-1 mb-3">
      {/* Copy button */}
      <button
        onClick={handleCopy}
        className={cn(
          "absolute right-4 top-7 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition text-secondary-foreground rounded flex items-center justify-center",
          isMobile && "opacity-100 text-muted-foreground"
        )}
      >
        {copied ? (
          <Check size={isMobile ? 16 : 20} />
        ) : (
          <Copy size={isMobile ? 16 : 20} />
        )}
      </button>

      <pre className="bg-gray-200 dark:bg-zinc-800 text-secondary-foreground p-3 rounded-lg overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
}
