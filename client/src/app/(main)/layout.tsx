import AppSidebar from "@/components/app-sidebar";
import Navbar from "@/components/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full h-full">
        <Navbar />
        {children}
      </main>
    </SidebarProvider>
  );
}
