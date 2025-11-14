import { Youtube, Github, Linkedin, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const socialLinks = [
    {
      name: "YouTube",
      url: "https://www.youtube.com/@buggybug1",
      icon: Youtube,
      label: "@buggybug1"
    },
    {
      name: "GitHub",
      url: "https://github.com/marufx86",
      icon: Github,
      label: "marufx86"
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/ornobmk/",
      icon: Linkedin,
      label: "ornobmk"
    },
    {
      name: "ArtStation",
      url: "https://ornobmk.artstation.com",
      icon: Palette,
      label: "Portfolio"
    }
  ];

  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Technical Documentation & Workflows
            </h3>
            <p className="text-muted-foreground text-sm">
              Personal notes and step-by-step guides for Unreal Engine, Houdini, Maya, and 3D workflows. 
              Sharing knowledge from years of game development and technical art.
            </p>
          </div>
          
          <div className="flex flex-col items-start md:items-end gap-4">
            <p className="text-sm font-medium text-foreground">Connect with me</p>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((link) => (
                <Button
                  key={link.name}
                  variant="outline"
                  size="sm"
                  asChild
                  className="gap-2"
                >
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <link.icon className="h-4 w-4" />
                    <span>{link.label}</span>
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Maruf Khan. Built with passion for technical artists and developers.
          </p>
        </div>
      </div>
    </footer>
  );
}
