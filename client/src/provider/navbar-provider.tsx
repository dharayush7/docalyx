"use client";
import { NavbarContext } from "@/context/navbar-context";
import React, { useState } from "react";

export default function NavbarProvider({ children }: React.PropsWithChildren) {
  const [title, setTitle] = useState<string | null>(null);

  return (
    <NavbarContext.Provider value={{ title, setTitle }}>
      {children}
    </NavbarContext.Provider>
  );
}
