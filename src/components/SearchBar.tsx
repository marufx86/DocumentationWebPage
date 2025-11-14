import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { searchDocumentation } from "@/data/documentation";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<ReturnType<typeof searchDocumentation>>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim()) {
      const searchResults = searchDocumentation(query);
      setResults(searchResults);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleResultClick = (docId: string) => {
    navigate(`/docs/${docId}`);
    setQuery("");
    setIsOpen(false);
  };

  const clearSearch = () => {
    setQuery("");
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search documentation... (try 'AudioMixer')"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10 bg-background border-border focus:ring-2 focus:ring-primary"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-card border border-border rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
          {results.map(({ doc, matchedSteps }) => (
            <div
              key={doc.id}
              className="border-b border-border last:border-b-0"
            >
              <button
                onClick={() => handleResultClick(doc.id)}
                className="w-full text-left p-4 hover:bg-accent transition-colors"
              >
                <h3 className="font-semibold text-foreground mb-1">{doc.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{doc.description}</p>
                {matchedSteps.length > 0 && (
                  <div className="text-xs text-muted-foreground">
                    Matched in {matchedSteps.length} step{matchedSteps.length > 1 ? "s" : ""}
                  </div>
                )}
              </button>
            </div>
          ))}
        </div>
      )}

      {isOpen && query && results.length === 0 && (
        <div className="absolute top-full mt-2 w-full bg-card border border-border rounded-lg shadow-lg p-4 z-50">
          <p className="text-sm text-muted-foreground">No results found for "{query}"</p>
        </div>
      )}
    </div>
  );
}
