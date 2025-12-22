"use client";
import {
  KindeProvider,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import React, { useEffect, useState } from "react";
import { AuthContext } from "../context/auth-centext";

function AuthStateProvider({ children }: React.PropsWithChildren) {
  const { user } = useKindeBrowserClient();
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setUserName(`${user.given_name} ${user.family_name}`);
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ userName, setUserName }}>
      {children}
    </AuthContext.Provider>
  );
}

export default function AuthProvider({ children }: React.PropsWithChildren) {
  return (
    <KindeProvider>
      <AuthStateProvider>{children}</AuthStateProvider>
    </KindeProvider>
  );
}
