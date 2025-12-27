import Main from "./Main";
import type { Metadata } from "next";

export default async function Page() {
  return <Main />;
}

export const metadata: Metadata = {
  title: "New Chat",
  description: "Start a new conversation by uploading your PDF.",
  alternates: {
    canonical: "/",
  },
};
