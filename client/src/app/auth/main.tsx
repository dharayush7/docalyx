"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LogIn, Sparkles, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Main() {
  const router = useRouter();
  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="space-y-3 text-center">
        <div className="mx-auto w-14 h-14 bg-primary rounded-xl flex items-center justify-center mb-2">
          <Sparkles className="w-7 h-7 text-primary-foreground" />
        </div>
        <CardTitle className="text-2xl">Welcome Back</CardTitle>
        <CardDescription>
          Sign in to your account or create a new one to get started
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Button
          className="w-full"
          size="lg"
          onClick={() => router.push("/api/auth/login?")}
        >
          <LogIn className="mr-2 h-5 w-5" />
          Login
        </Button>

        <Button
          variant="outline"
          className="w-full"
          size="lg"
          onClick={() => router.push("/api/auth/register?")}
        >
          <UserPlus className="mr-2 h-5 w-5" />
          Sign Up
        </Button>
      </CardContent>
    </Card>
  );
}
