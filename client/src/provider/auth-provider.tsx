"use client";
import { KindeProvider } from "@kinde-oss/kinde-auth-nextjs";
import React from "react";

export default function AuthProvider({ children }: React.PropsWithChildren) {
  return <KindeProvider>{children}</KindeProvider>;
}
