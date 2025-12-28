import type { Metadata } from "next";
import { Geist, Geist_Mono, Nunito_Sans } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/provider/auth-provider";
import { ThemeProvider } from "@/provider/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import ReactQueryProvider from "@/provider/react-query-provider";
const nunitoSans = Nunito_Sans({ variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.KINDE_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Docalyx — Intelligent Document Analysis",
    template: "%s · Docalyx",
  },
  description:
    "Docalyx is an AI-powered document intelligence tool that lets you upload PDFs, analyze them instantly, and chat with your documents. Ask questions, extract insights, summarize sections, and search context-aware answers without scrolling through pages manually.",
  applicationName: "Docalyx",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Docalyx",
    title: "Docalyx — Intelligent Document Analysis",
    description:
      "Upload PDFs, analyze instantly, and chat with your documents using AI.",
  },
  twitter: {
    card: "summary",
    title: "Docalyx — Intelligent Document Analysis",
    description:
      "Upload PDFs, analyze instantly, and chat with your documents using AI.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en" className={nunitoSans.variable} suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider>
            <ReactQueryProvider>
              {children}
              <Toaster />
            </ReactQueryProvider>
          </ThemeProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
