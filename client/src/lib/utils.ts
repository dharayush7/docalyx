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
