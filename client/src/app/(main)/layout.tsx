import AppSidebar from "@/components/app-sidebar";
import Navbar from "@/components/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import SocketProvider from "@/provider/socket-provider";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/auth");
  }
  return (
    <SocketProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full h-full">
          <Navbar />
          {children}
        </main>
      </SidebarProvider>
    </SocketProvider>
  );
}
