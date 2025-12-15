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
import { useRouter } from "next/navigation";
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

export default function AppSidebar() {
  const { open, toggleSidebar } = useSidebar();
  const [hover, setHover] = useState(false);
  const router = useRouter();

  return (
    <Sidebar
      collapsible="icon"
      variant="sidebar"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => {
        if (!open) {
          toggleSidebar();
        }
      }}
      className={cn(!open && "cursor-e-resize")}
    >
      <SidebarHeader>
        {open && (
          <div className="w-full flex justify-between">
            <Button variant="ghost" size="icon-sm">
              <User2 />
            </Button>
            <SidebarTrigger />
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
                  })}
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
      <SidebarContent>
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
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>chat1</SidebarMenuButton>
                </SidebarMenuItem>
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton>
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
          <DropdownMenuItem>
            <Info />
            <span>About</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <User2 />
            <span>My Profile</span>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <SunMoon /> Theme
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="w-50">
                <DropdownMenuCheckboxItem
                  checked={theme === "light"}
                  onClick={() => setTheme("light")}
                >
                  <Sun /> Light
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={theme === "dark"}
                  onClick={() => setTheme("dark")}
                >
                  <Moon /> Dark
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={theme === "system"}
                  onClick={() => setTheme("system")}
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
