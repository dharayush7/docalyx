import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SearchX, Home, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-xl"
      >
        <Card className="border-muted/40 shadow-xl rounded-2xl">
          <CardContent className="p-8">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-muted/40 flex items-center justify-center">
                <SearchX className="w-8 h-8 text-muted-foreground" />
              </div>

              <h1 className="text-3xl font-semibold tracking-tight">
                Page not found
              </h1>

              <p className="text-muted-foreground max-w-sm">
                The page you’re looking for doesn’t exist or may have been
                moved.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 w-full">
                <Button
                  variant="secondary"
                  className="rounded-2xl flex items-center gap-2"
                  onClick={() => window.history.back()}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Go Back
                </Button>

                <Link href="/">
                  <Button className="w-full rounded-2xl flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    Go Home
                  </Button>
                </Link>
              </div>

              <div className="mt-6 text-xs text-muted-foreground">
                Error code: 404 — Not Found
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
