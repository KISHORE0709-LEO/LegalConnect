import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Scale, Menu, X } from "lucide-react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-primary p-2 rounded-lg shadow-legal">
              <Scale className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold font-legal text-foreground">Legal Connect</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#personas" className="text-muted-foreground hover:text-foreground transition-colors">
              Personas
            </a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </a>
            <a href="#lawyers" className="text-muted-foreground hover:text-foreground transition-colors">
              Find Lawyers
            </a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost">Sign In</Button>
            <Button className="bg-gradient-primary shadow-legal hover:shadow-hover transition-all duration-300">
              Get Started
            </Button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#personas" className="text-muted-foreground hover:text-foreground transition-colors">
                Personas
              </a>
              <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
                How It Works
              </a>
              <a href="#lawyers" className="text-muted-foreground hover:text-foreground transition-colors">
                Find Lawyers
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="ghost">Sign In</Button>
                <Button className="bg-gradient-primary shadow-legal">
                  Get Started
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};