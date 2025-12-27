"use client";

import { Button } from "@/components/ui/button";
import { users } from "@/generated/prisma/client";
import useNavbar from "@/hooks/use-navbar";
import { cn } from "@/lib/utils";
import { Loader2, LogOut, Mail, User } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useUpdateUserMutation } from "./mutation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

export default function Main({ dbUser }: { dbUser: users }) {
  const { setTitle } = useNavbar();
  const [isEditingName, setIsEditingName] = useState(false);
  const [name, setName] = useState(dbUser.name);
  const [error, setError] = useState<string | null>(null);
  const mutation = useUpdateUserMutation();

  useEffect(() => {
    setTitle("Profile");
  }, []);

  const onClick = () => {
    if (isEditingName) {
      setError(null);
      const nameToSave = name.trim();
      if (nameToSave.length < 2) {
        setError("Name must be at least 2 characters long");
        return;
      }
      if (nameToSave && nameToSave !== dbUser.name) {
        mutation.mutate(
          { name: nameToSave },
          {
            onSuccess: (r) => {
              if (r.success && r.data) {
                setName(r.data.name);
                setIsEditingName(false);
                setError(null);
              }
            },
          },
        );
      } else setIsEditingName(false);
    } else setIsEditingName(true);
  };

  return (
    <div className="pt-18 px-4">
      <div className="max-w-xl mx-auto md:mt-20">
        {/* Main Card */}
        <div className="bg-card text-card-foreground rounded-2xl shadow-lg border overflow-hidden">
          {/* Header with subtle background */}
          <div className="relative h-28 bg-muted">
            <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2">
              <div className="relative">
                <Image
                  src={dbUser.avatar_url || "/default-avatar.png"}
                  alt="User avatar"
                  width={112}
                  height={112}
                  className="w-28 h-28 rounded-full border-4 border-background shadow-md"
                />
              </div>
            </div>
            <LogoutDialog />
          </div>

          {/* Content */}
          <div className="pt-20 pb-8 px-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold">Profile</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Manage your personal information
              </p>
            </div>

            <div className="space-y-3">
              {/* Name Field */}
              <div className="group">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-muted-foreground mb-1">
                      NAME
                    </p>
                    {isEditingName ? (
                      <>
                        <input
                          type="text"
                          aria-label="Name"
                          placeholder="Enter your name"
                          defaultValue={name}
                          onChange={(e) => setName(e.target.value)}
                          className={cn(
                            "bg-transparent outline-none text-base font-medium w-full border-b-2 border-muted-foreground/30 focus-visible:outline-none focus-visible:border-primary transition-colors peer",
                            error ? "border-destructive" : "",
                          )}
                        />
                        {error && (
                          <p className="text-destructive text-xs mt-1">
                            {error}
                          </p>
                        )}
                      </>
                    ) : (
                      <p className="text-sm font-medium truncate">
                        {name || "Enter your name"}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Email Field */}
              <div className="group">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-muted-foreground mb-1">
                      EMAIL
                    </p>
                    <p className="text-base font-medium truncate">
                      {dbUser.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-8">
              <Button
                className="w-full py-5 px-4 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
                onClick={onClick}
                disabled={mutation.isPending}
              >
                {isEditingName ? (
                  <>
                    {mutation.isPending ? (
                      <>
                        <Loader2 className="animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </>
                ) : (
                  "Edit Profile"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LogoutDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <Button
        variant="ghost"
        size="icon-lg"
        className="absolute right-4 top-4 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <LogOut className="h-5! w-5! text-destructive" />
      </Button>
      <AlertDialogContent className="sm:max-w-106.25 gap-6 p-6">
        <AlertDialogHeader className="gap-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <LogOut className="h-6 w-6 text-destructive" />
          </div>
          <AlertDialogTitle className="text-center text-xl">
            Confirm Logout
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-base">
            Are you sure you want to logout? You'll need to sign in again to
            access your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row gap-3 sm:gap-3">
          <Button
            variant="destructive"
            className="flex-1"
            onClick={() => router.push("/api/auth/logout")}
          >
            Logout
          </Button>
          <Button className="flex-1" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
