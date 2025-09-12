import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Shield, Users } from "lucide-react";
import heroImage from "@/assets/legal-hero.jpg";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-legal-primary/10 via-transparent to-legal-primary-dark/5"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              Make Legal Documents
              <span className="block text-legal-accent">Understandable</span>
            </h1>
            
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl">
              AI-powered platform that simplifies legal jargon, analyzes risks, and connects you with lawyers. 
              Perfect for freelancers, startups, students, and everyone who needs legal clarity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-legal-accent text-legal-primary hover:bg-legal-accent/90 shadow-hover transition-all duration-300"
              >
                Upload Document
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
              >
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center justify-center lg:justify-start space-x-8 mt-12">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-primary-foreground/10 rounded-lg mb-2">
                  <FileText className="h-6 w-6 text-primary-foreground" />
                </div>
                <p className="text-sm text-primary-foreground/70">Document Analysis</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-primary-foreground/10 rounded-lg mb-2">
                  <Shield className="h-6 w-6 text-primary-foreground" />
                </div>
                <p className="text-sm text-primary-foreground/70">Risk Assessment</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-primary-foreground/10 rounded-lg mb-2">
                  <Users className="h-6 w-6 text-primary-foreground" />
                </div>
                <p className="text-sm text-primary-foreground/70">Lawyer Connect</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={heroImage} 
                alt="Legal Connect Platform" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-legal-primary/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};