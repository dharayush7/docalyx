"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LogIn, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import logo from "@/assets/docalyx.png";
import Image from "next/image";

export default function Main() {
  const router = useRouter();
  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="space-y-3 text-center">
        <div className="mx-auto w-14 h-14 rounded-xl flex items-center justify-center mb-2">
          <Image
            src={logo}
            alt="Logo"
            className="w-fit h-full"
            width={100}
            height={100}
          />
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
