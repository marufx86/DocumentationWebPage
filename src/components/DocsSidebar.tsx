import { Book, FileText, ChevronDown } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
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
import { documentationData, Documentation } from "@/data/documentation";

interface CategoryNode {
  name: string;
  docs: Documentation[];
  subcategories: Map<string, CategoryNode>;
}

function buildCategoryTree(docs: Documentation[]): Map<string, CategoryNode> {
  const tree = new Map<string, CategoryNode>();

  docs.forEach((doc) => {
    // Get or create main category
    if (!tree.has(doc.category)) {
      tree.set(doc.category, {
        name: doc.category,
        docs: [],
        subcategories: new Map(),
      });
    }
    const categoryNode = tree.get(doc.category)!;

    if (doc.subcategory) {
      // Get or create subcategory
      if (!categoryNode.subcategories.has(doc.subcategory)) {
        categoryNode.subcategories.set(doc.subcategory, {
          name: doc.subcategory,
          docs: [],
          subcategories: new Map(),
        });
      }
      const subcategoryNode = categoryNode.subcategories.get(doc.subcategory)!;

      if (doc.subSubcategory) {
        // Get or create sub-subcategory
        if (!subcategoryNode.subcategories.has(doc.subSubcategory)) {
          subcategoryNode.subcategories.set(doc.subSubcategory, {
            name: doc.subSubcategory,
            docs: [],
            subcategories: new Map(),
          });
        }
        const subSubcategoryNode = subcategoryNode.subcategories.get(doc.subSubcategory)!;
        subSubcategoryNode.docs.push(doc);
      } else {
        subcategoryNode.docs.push(doc);
      }
    } else {
      categoryNode.docs.push(doc);
    }
  });

  return tree;
}

interface CategoryRendererProps {
  node: CategoryNode;
  level: number;
  openState: Record<string, boolean>;
  toggleOpen: (key: string) => void;
  path: string;
}

function CategoryRenderer({ node, level, openState, toggleOpen, path }: CategoryRendererProps) {
  const hasSubcategories = node.subcategories.size > 0;
  const hasDocs = node.docs.length > 0;
  const isOpen = openState[path] ?? false;
  const paddingLeft = level * 16;
  
  // Different styling based on level
  const getLabelStyles = () => {
    switch(level) {
      case 0: // Main category
        return "text-sidebar-foreground text-sm font-bold uppercase tracking-wide mb-1 mt-4";
      case 1: // Subcategory
        return "text-sidebar-foreground/90 text-sm font-semibold mb-1 mt-2";
      case 2: // Sub-subcategory
        return "text-sidebar-foreground/80 text-xs font-medium mb-1 mt-1";
      default:
        return "text-sidebar-foreground/70 text-xs font-normal";
    }
  };

  return (
    <Collapsible open={isOpen} onOpenChange={() => toggleOpen(path)}>
      <CollapsibleTrigger className="w-full group">
        <SidebarGroupLabel 
          className={`${getLabelStyles()} flex items-center justify-between cursor-pointer hover:text-primary transition-colors py-2 px-3 rounded-md hover:bg-sidebar-accent/50`}
          style={{ paddingLeft: `${paddingLeft + 12}px` }}
        >
          <span className="flex-1 text-left">{node.name}</span>
          <ChevronDown className={`h-4 w-4 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </SidebarGroupLabel>
      </CollapsibleTrigger>
      
      <CollapsibleContent className="space-y-1">
        {/* Render documents at this level */}
        {hasDocs && (
          <SidebarGroupContent>
            <SidebarMenu>
              {node.docs.map((doc) => (
                <SidebarMenuItem key={doc.id}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={`/docs/${doc.id}`}
                      className="flex items-center gap-2 text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors py-2 px-3 rounded-md my-0.5"
                      style={{ paddingLeft: `${paddingLeft + 24}px` }}
                      activeClassName="bg-sidebar-accent text-primary font-medium border-l-2 border-primary"
                    >
                      <FileText className="h-4 w-4 flex-shrink-0 opacity-70" />
                      <span className="text-sm truncate">{doc.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        )}

        {/* Render subcategories recursively */}
        {hasSubcategories && (
          <div className="space-y-0.5">
            {Array.from(node.subcategories.entries()).map(([subcatName, subcatNode]) => (
              <CategoryRenderer
                key={subcatName}
                node={subcatNode}
                level={level + 1}
                openState={openState}
                toggleOpen={toggleOpen}
                path={`${path}/${subcatName}`}
              />
            ))}
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}

function findDocPath(docId: string, tree: Map<string, CategoryNode>, parentPath: string = ""): string | null {
  for (const [categoryName, node] of tree.entries()) {
    const currentPath = parentPath ? `${parentPath}/${categoryName}` : categoryName;
    
    // Check if doc is in current node
    if (node.docs.some(doc => doc.id === docId)) {
      return currentPath;
    }
    
    // Check subcategories recursively
    const foundInSub = findDocPath(docId, node.subcategories, currentPath);
    if (foundInSub) {
      return foundInSub;
    }
  }
  return null;
}

function getOpenStateForDoc(docId: string | undefined, tree: Map<string, CategoryNode>): Record<string, boolean> {
  if (!docId) return {};
  
  const docPath = findDocPath(docId, tree);
  if (!docPath) return {};
  
  // Build open state for all parent paths
  const openState: Record<string, boolean> = {};
  const pathParts = docPath.split('/');
  let currentPath = '';
  
  for (const part of pathParts) {
    currentPath = currentPath ? `${currentPath}/${part}` : part;
    openState[currentPath] = true;
  }
  
  return openState;
}

export function DocsSidebar() {
  const { id: currentDocId } = useParams<{ id: string }>();
  const categoryTree = buildCategoryTree(documentationData);
  const [openState, setOpenState] = useState<Record<string, boolean>>(() => 
    getOpenStateForDoc(currentDocId, categoryTree)
  );

  // Update open state when route changes
  useEffect(() => {
    setOpenState(getOpenStateForDoc(currentDocId, categoryTree));
  }, [currentDocId]);

  const toggleOpen = (path: string) => {
    setOpenState(prev => ({ ...prev, [path]: !prev[path] }));
  };

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border px-6 py-4">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Book className="h-6 w-6 text-sidebar-primary" />
          <h2 className="text-lg font-semibold text-sidebar-foreground">Tech Docs</h2>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {Array.from(categoryTree.entries()).map(([categoryName, categoryNode]) => (
          <SidebarGroup key={categoryName}>
            <CategoryRenderer
              node={categoryNode}
              level={0}
              openState={openState}
              toggleOpen={toggleOpen}
              path={categoryName}
            />
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}