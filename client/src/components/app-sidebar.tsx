"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "./ui/sidebar";
import {
  Edit,
  Info,
  Loader2,
  Monitor,
  Moon,
  PanelLeftIcon,
  Sun,
  SunMoon,
  User2,
} from "lucide-react";
import { useSidebar } from "./ui/sidebar";
import { useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import Image from "next/image";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useTheme } from "next-themes";
import { useQuery } from "@tanstack/react-query";
import kyInstance from "@/lib/ky";
import { chats } from "@/generated/prisma/client";

export default function AppSidebar() {
  const { open, toggleSidebar } = useSidebar();
  const [hover, setHover] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const {
    data: chats,
    isLoading,
    isError,
  } = useQuery({
    queryFn: () => kyInstance.get("/api/chat").json<chats[]>(),
    queryKey: ["chats"],
  });

  return (
    <Sidebar
      collapsible="icon"
      variant="sidebar"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={cn(!open && "cursor-e-resize")}
    >
      <SidebarHeader>
        {open && (
          <div className="w-full flex justify-between">
            <Button variant="ghost" size="icon-sm">
              <User2 />
            </Button>
            <SidebarTrigger className="cursor-w-resize" />
          </div>
        )}
        {!open && (
          <>
            {hover ? (
              <Tooltip>
                <TooltipTrigger
                  className={buttonVariants({
                    variant: "ghost",
                    size: "icon-sm",
                    className: "cursor-e-resize",
                  })}
                  onClick={(e) => {
                    toggleSidebar();
                  }}
                >
                  <PanelLeftIcon />
                </TooltipTrigger>
                <TooltipContent side="right" align="center">
                  Sidebar open
                </TooltipContent>
              </Tooltip>
            ) : (
              <Button variant="ghost" size="icon-sm">
                <User2 />
              </Button>
            )}
          </>
        )}
      </SidebarHeader>
      <SidebarContent
        onClick={() => {
          if (!open) {
            toggleSidebar();
          }
        }}
      >
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="New chat"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    router.push("/");
                  }}
                  className={cn(
                    "cursor-pointer",
                    pathname === "/" && "bg-primary text-primary-foreground"
                  )}
                >
                  <Edit />
                  <span>New chat</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {open && (
          <SidebarGroup>
            <SidebarGroupLabel>Recent chats</SidebarGroupLabel>
            {isLoading && (
              <div className="flex flex-col justify-center items-center gap-1">
                <Loader2 size={16} className="animate-spin text-primary" />
                <p className="text-sm text-muted-foreground font-medium">
                  Loading chats...
                </p>
              </div>
            )}
            {(!chats || isError) && (
              <div>
                <p className="w-full font-medium text-sm text-center text-destructive mt-2">
                  Error loading chats
                </p>
              </div>
            )}
            {chats?.length === 0 && <p>No chats</p>}
            <SidebarGroupContent className="overflow-y-scroll h-full">
              <SidebarMenu>
                {chats &&
                  chats.map((chat, i) => (
                    <SidebarMenuItem key={i}>
                      <SidebarMenuButton
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          router.push(`/chat/${chat.id}`);
                        }}
                        className=""
                      >
                        <p className="truncate">{chat.name}</p>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <AccountDropdown />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

function AccountDropdown() {
  const { user, isAuthenticated } = useKindeBrowserClient();
  const { theme, setTheme } = useTheme();

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
        <SidebarMenuButton className="cursor-pointer">
          <Image
            src={user?.picture || ""}
            alt={user?.given_name || ""}
            width={20}
            height={20}
            className="rounded-full"
          />
          <span className="ml-2">
            {user.given_name} {user.family_name}
          </span>
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-xs">
        <div className="flex items-center gap-4 p-2">
          <Image
            src={user?.picture || ""}
            alt={user?.given_name || ""}
            width={28}
            height={28}
            className="rounded-full"
          />
          <div>
            <p>
              {user.given_name} {user.family_name}
            </p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <Info />
            <span>About</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <User2 />
            <span>My Profile</span>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="cursor-pointer">
              <SunMoon /> Theme
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="w-50 absolute -left-44 -top-20 md:static">
                <DropdownMenuCheckboxItem
                  checked={theme === "light"}
                  onClick={() => setTheme("light")}
                  className="cursor-pointer"
                >
                  <Sun /> Light
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={theme === "dark"}
                  onClick={() => setTheme("dark")}
                  className="cursor-pointer"
                >
                  <Moon /> Dark
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={theme === "system"}
                  onClick={() => setTheme("system")}
                  className="cursor-pointer"
                >
                  <Monitor /> System
                </DropdownMenuCheckboxItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
