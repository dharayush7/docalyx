import { createContext } from "react";

type NavbarContextType = {
  title: string | null;
  setTitle: (val: string | null) => void;
};

export const NavbarContext = createContext<NavbarContextType | null>(null);
