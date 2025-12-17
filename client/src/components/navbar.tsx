"use client";
import { Edit, PanelLeftIcon, User2 } from "lucide-react";
import { useSidebar } from "./ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import useNavbar from "@/hooks/use-navbar";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { toggleSidebar, open } = useSidebar();
  const mobile = useIsMobile();
  const router = useRouter();
  const { title } = useNavbar();

  return (
    <nav className="w-full bg-card h-14 px-5 flex justify-between md:justify-start items-center relative">
      <div className="flex items-center h-full gap-4">
        {mobile && (
          <Button variant="ghost" size="icon-sm" onClick={toggleSidebar}>
            <PanelLeftIcon />
          </Button>
        )}
        <div className="flex items-center gap-1">
          <User2 className="w-4 h-4" />
          {!mobile && <p className="text-lg font-semibold">PDFAI</p>}
        </div>
      </div>
      <div
        className={cn(
          "absolute text-xs md:text-lg font-medium top-1/2 gap-2 w-fit -translate-y-1/2 left-1/2 transition-all duration-300 ease-in-out truncate max-w-[calc(100%-12rem)]",
          !mobile
            ? open
              ? "-translate-x-[calc(var(--sidebar-width)/2)]"
              : "-translate-x-[calc(50%+var(--sidebar-width-icon)/2)]"
            : "-translate-x-1/2"
        )}
      >
        {title || "New chat"}
      </div>
      {mobile && (
        <Button variant="ghost" size="icon-sm" onClick={() => router.push("/")}>
          <Edit />
        </Button>
      )}
    </nav>
  );
}
