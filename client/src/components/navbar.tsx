"use client";
import { Edit, PanelLeftIcon, User2 } from "lucide-react";
import { useSidebar } from "./ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { toggleSidebar } = useSidebar();
  const mobile = useIsMobile();
  const router = useRouter();

  return (
    <nav className="w-full bg-card fixed h-14 px-5 flex justify-between items-center">
      <div className="flex items-center h-full gap-4">
        {mobile && (
          <Button variant="ghost" size="icon-sm" onClick={toggleSidebar}>
            <PanelLeftIcon />
          </Button>
        )}
        <div className="flex items-center gap-1">
          <User2 className="w-4 h-4" />
          <p className="text-lg font-semibold">PDFAI</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon-sm" onClick={() => router.push("/")}>
          <Edit />
        </Button>
      </div>
    </nav>
  );
}
