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
} from "./ui/sidebar";
import {
  Edit,
  InboxIcon,
  Info,
  Loader2,
  MessageCircle,
  Monitor,
  Moon,
  PanelLeftIcon,
  Search,
  Sun,
  SunMoon,
  User2,
  XIcon,
} from "lucide-react";
import { useSidebar } from "./ui/sidebar";
import { useEffect, useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import { cn, isMac } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import Image from "next/image";
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import logo from "@/assets/docalyx.png";
import useAuth from "@/hooks/use-auth";
import { Kbd, KbdGroup } from "./ui/kbd";

export default function AppSidebar() {
  const { open, toggleSidebar } = useSidebar();
  const [hover, setHover] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { data: chats, isLoading } = useQuery({
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
            <Button
              variant="ghost"
              size="icon-lg"
              onClick={() => router.push("/")}
              className="cursor-pointer"
            >
              <Image
                src={logo}
                alt="Docalyx"
                width={40}
                height={40}
                className="w-8! h-8!"
              />
            </Button>
            <Button
              variant="ghost"
              size="icon-lg"
              onClick={toggleSidebar}
              className="cursor-w-resize"
            >
              <PanelLeftIcon className="w-5! h-5!" />
            </Button>
          </div>
        )}
        {!open && (
          <>
            {hover ? (
              <Tooltip>
                <TooltipTrigger
                  className={buttonVariants({
                    variant: "ghost",
                    size: "icon-lg",
                    className: "cursor-e-resize",
                  })}
                  onClick={(e) => {
                    toggleSidebar();
                  }}
                >
                  <PanelLeftIcon className="w-5! h-5!" />
                </TooltipTrigger>
                <TooltipContent side="right" align="center">
                  Sidebar open
                </TooltipContent>
              </Tooltip>
            ) : (
              <Button
                variant="ghost"
                size="icon-lg"
                onClick={() => router.push("/")}
              >
                <Image
                  src={logo}
                  alt="Docalyx"
                  width={40}
                  height={40}
                  className="w-8! h-8!"
                />
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
              <SearchDialog chats={chats || []} />
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
            {!isLoading && !chats && (
              <div>
                <p className="w-full font-medium text-sm text-center text-destructive mt-2">
                  Error loading chats
                </p>
              </div>
            )}
            {chats?.length === 0 && (
              <div className="flex flex-col justify-center items-center gap-1 mt-7">
                <InboxIcon className="w-8 h-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground font-medium">
                  No chats
                </p>
              </div>
            )}
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
                        className={cn(
                          "cursor-pointer",
                          pathname === `/chat/${chat.id}` &&
                            "bg-primary text-primary-foreground"
                        )}
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
  const { user, isAuthenticated, userName } = useAuth();
  const { theme, setTheme } = useTheme();
  const router = useRouter();

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
          <span className="ml-2">{userName}</span>
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
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => router.push(`/profile`)}
          >
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

function SearchDialog({ chats }: { chats: chats[] }) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // Cmd + K (Mac) OR Ctrl + K (Windows/Linux)
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(!open);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, setOpen]);

  const filteredChats = chats.filter((chat) => {
    return chat.name.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <SidebarMenuItem>
        <SidebarMenuButton
          tooltip="Search chats"
          className="cursor-pointer group/search"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setOpen(true);
          }}
        >
          <Search />
          <span className="flex justify-between w-full">
            Search chats
            <KbdGroup className="">
              {!isMac() ? (
                <>
                  <Kbd className="group-hover/search:bg-muted/20! group-hover/search:text-black">
                    ⌘K
                  </Kbd>
                </>
              ) : (
                <>
                  <Kbd className="group-hover/search:bg-muted/20! group-hover/search:text-black">
                    Ctrl
                  </Kbd>
                  <span className="">+</span>
                  <Kbd className="group-hover/search:bg-muted/20! group-hover/search:text-black">
                    K
                  </Kbd>
                </>
              )}
            </KbdGroup>
          </span>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <DialogContent
        showCloseButton={false}
        className="md:max-w-2xl bg-card p-0! rounded-3xl md:min-h-60 m-0!"
      >
        <DialogHeader className="p-0! m-0! hidden">
          <DialogTitle className="p-0! m-0! hidden"></DialogTitle>
        </DialogHeader>
        <div className="w-full">
          <div className="relative">
            <Input
              placeholder="Search chats..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-[90%] md:w-full py-8 rounded-t-3xl ring-0 focus-visible:ring-0 border-0 rounded-b-none bg-card! px-6 border-b dark:border-zinc-700 focus-visible:border-0 focus-visible:border-b dark:focus-visible:border-zinc-700 focus-visible:border-gray-300 border-gray-300"
            />
            <DialogClose className="absolute top-5 right-8 md:right-5 cursor-pointer">
              <XIcon size={20} className="text-muted-foreground" />
            </DialogClose>
          </div>
          <div className="px-3 space-y-2 mt-4 w-full">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                className="hover:bg-muted py-3 px-2 md:px-4 rounded-lg flex items-center cursor-pointer w-full"
                onClick={() => {
                  router.push(`/chat/${chat.id}`);
                }}
              >
                <p className="text-ellipsis truncate flex items-center gap-2">
                  <MessageCircle size={20} />
                  <span className="max-w-[80%] truncate">{chat.name}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
