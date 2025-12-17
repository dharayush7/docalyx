import { NavbarContext } from "@/context/navbar-context";
import { useContext } from "react";

export default function useNavbar() {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error("useNavbar must be used within a NavbarProvider");
  }
  return context;
}
