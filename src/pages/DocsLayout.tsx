import { Outlet, Link } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DocsSidebar } from "@/components/DocsSidebar";
import { SearchBar } from "@/components/SearchBar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/Footer";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DocsLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DocsSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
            <div className="flex items-center gap-4 px-6 py-4">
              <SidebarTrigger />
              <Link to="/">
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Home className="h-4 w-4" />
                  <span className="sr-only">Home</span>
                </Button>
              </Link>
              <SearchBar />
              <div className="ml-auto">
                <ThemeToggle />
              </div>
            </div>
          </header>
          
          <main className="flex-1 flex flex-col">
            <div className="flex-1">
              <Outlet />
            </div>
            <Footer />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
