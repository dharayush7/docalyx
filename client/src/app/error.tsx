"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ErrorPage({ reset }: { reset?: () => void }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-xl"
      >
        <Card className="border-muted/40 shadow-xl rounded-2xl">
          <CardContent className="p-8">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-destructive" />
              </div>

              <h1 className="text-3xl font-semibold tracking-tight">
                Something went wrong
              </h1>

              <p className="text-muted-foreground max-w-sm">
                An unexpected error occurred while processing your request. You
                can refresh the page or return to the previous screen.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 w-full">
                {reset && (
                  <Button
                    onClick={reset}
                    className="rounded-2xl flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Retry
                  </Button>
                )}

                <Button
                  variant="secondary"
                  className="rounded-2xl flex items-center gap-2"
                  onClick={() => window.history.back()}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Go Back
                </Button>

                <Link href="/">
                  <Button
                    variant="outline"
                    className="w-full rounded-2xl flex items-center gap-2"
                  >
                    <Home className="w-4 h-4" />
                    Home
                  </Button>
                </Link>
              </div>

              <div className="mt-6 text-xs text-muted-foreground">
                Error code: 500 — Internal Application Error
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
