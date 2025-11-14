import { useParams, useNavigate } from "react-router-dom";
import { documentationData } from "@/data/documentation";
import { DocStep } from "@/components/DocStep";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Book } from "lucide-react";

export default function DocumentationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const currentIndex = documentationData.findIndex((doc) => doc.id === id);
  const doc = documentationData[currentIndex];
  
  const prevDoc = currentIndex > 0 ? documentationData[currentIndex - 1] : null;
  const nextDoc = currentIndex < documentationData.length - 1 ? documentationData[currentIndex + 1] : null;

  if (!doc) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Documentation not found</h1>
          <Button onClick={() => navigate("/")}>Return to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Book className="h-4 w-4" />
          <span>{doc.category}</span>
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">{doc.title}</h1>
        <p className="text-lg text-muted-foreground">{doc.description}</p>
      </div>

      <div className="space-y-6">
        {doc.steps.map((step, index) => (
          <DocStep key={step.id} step={step} stepNumber={index + 1} />
        ))}
      </div>

      <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
        {prevDoc ? (
          <Button
            variant="outline"
            onClick={() => navigate(`/docs/${prevDoc.id}`)}
            className="group"
          >
            <ChevronLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            <div className="text-left">
              <div className="text-xs text-muted-foreground">Previous</div>
              <div className="text-sm font-medium">{prevDoc.title}</div>
            </div>
          </Button>
        ) : (
          <div />
        )}

        {nextDoc ? (
          <Button
            variant="outline"
            onClick={() => navigate(`/docs/${nextDoc.id}`)}
            className="group"
          >
            <div className="text-right">
              <div className="text-xs text-muted-foreground">Next</div>
              <div className="text-sm font-medium">{nextDoc.title}</div>
            </div>
            <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
