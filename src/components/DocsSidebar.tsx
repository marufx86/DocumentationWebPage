import { Book, FileText } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { documentationData } from "@/data/documentation";

export function DocsSidebar() {
  const categories = Array.from(new Set(documentationData.map((doc) => doc.category)));

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border px-6 py-4">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Book className="h-6 w-6 text-sidebar-primary" />
          <h2 className="text-lg font-semibold text-sidebar-foreground">Tech Docs</h2>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {categories.map((category) => {
          const docsInCategory = documentationData.filter((doc) => doc.category === category);
          
          return (
            <SidebarGroup key={category}>
              <SidebarGroupLabel className="text-sidebar-foreground/70 text-xs font-semibold uppercase tracking-wider">
                {category}
              </SidebarGroupLabel>
              
              <SidebarGroupContent>
                <SidebarMenu>
                  {docsInCategory.map((doc) => (
                    <SidebarMenuItem key={doc.id}>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to={`/docs/${doc.id}`}
                          className="flex items-center gap-2 text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
                          activeClassName="bg-sidebar-accent text-sidebar-foreground font-medium border-l-2 border-sidebar-primary"
                        >
                          <FileText className="h-4 w-4" />
                          <span className="text-sm">{doc.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>
    </Sidebar>
  );
}
