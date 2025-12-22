import { AuthContext } from "@/context/auth-centext";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useContext } from "react";

export default function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  const kindeContext = useKindeBrowserClient();
  return { ...kindeContext, ...context };
}
