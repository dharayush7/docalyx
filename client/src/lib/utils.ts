import { clsx, type ClassValue } from "clsx";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isFileSizeGreaterThan(
  file: File,
  maxSizeInMB: number
): boolean {
  const sizeInBytes = maxSizeInMB * 1024 * 1024;
  return file.size > sizeInBytes;
}

export function formatDateTime(input: string | Date | number): string {
  const date = new Date(input);
  const now = new Date();

  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);

  // 1️⃣ Just now
  if (diffSeconds < 60) {
    return "Just now";
  }

  // 2️⃣ Minutes ago
  if (diffMinutes < 60) {
    return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
  }

  // 3️⃣ Hours ago
  if (diffHours < 24) {
    return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  }

  // 4️⃣ Full date format
  return date.toLocaleString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour12: false,
  });
}

export function fixMarkdown(input: string): string {
  let text = input.trim();

  // 1️⃣ Remove ```markdown wrapper ONLY
  text = text.replace(/^```markdown\s*/i, "");
  text = text.replace(/```$/, "");

  // 2️⃣ Extract code blocks safely
  // const codeBlocks: CodeBlock[] = [];
  // text = text.replace(/```[\s\S]*?```/g, (match) => {
  //   const key = `__CODE_BLOCK_${codeBlocks.length}__`;
  //   codeBlocks.push({ key, value: match });
  //   return key;
  // });

  // ===============================
  // FIX ONLY NON-CODE MARKDOWN
  // ===============================

  // Headings spacing
  // text = text.replace(/(#{1,6})([^#\s])/g, "$1 $2");
  // text = text.replace(/(#{1,6} .+)(?!\n)/g, "$1\n\n");

  // Horizontal rules
  // text = text.replace(/---/g, "\n\n\n\n");

  // Lists
  // text = text.replace(/([^\n])\n?(- |\* )/g, "$1\n\n$2");
  // text = text.replace(/([^\n])\n?(\d+\. )/g, "$1\n\n$2");

  // Tables
  // text = text.replace(/\|\s*---/g, "\n| ---");

  // Collapse excessive newlines
  // text = text.replace(/\n{3,}/g, "\n\n");

  // ===============================
  // RESTORE CODE BLOCKS (UNTOUCHED)
  // ===============================

  // for (const block of codeBlocks) {
  //   text = text.replace(block.key, block.value);
  // }

  return text.trim();
}

export function getTextFromReactNode(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getTextFromReactNode).join("");
  }

  if (typeof node === "object" && node !== null && "props" in node) {
    return getTextFromReactNode((node as any).props.children);
  }

  return "";
}
