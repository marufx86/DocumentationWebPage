import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Zap } from "lucide-react";
import { documentationData } from "@/data/documentation";
import { Footer } from "@/components/Footer";
import { SearchBar } from "@/components/SearchBar";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="h-4 w-4" />
            Technical Documentation
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Maruf's Technical Journey
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Notes, guides, and workflows from an Unreal Engine Developer & 3D Artist.
          </p>
          
          <SearchBar />
        </div>

        {/* Documentation List */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">Available Guides</h2>
          <div className="grid gap-4">
            {documentationData.map((doc) => (
              <Card
                key={doc.id}
                className="border-border bg-card hover:border-primary/50 transition-colors cursor-pointer"
                onClick={() => navigate(`/docs/${doc.id}`)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{doc.title}</CardTitle>
                      <CardDescription>{doc.description}</CardDescription>
                    </div>
                    <div className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {doc.category}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    {doc.steps.length} steps
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
