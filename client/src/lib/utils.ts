import { clsx, type ClassValue } from "clsx";
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
