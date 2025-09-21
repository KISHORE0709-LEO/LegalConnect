import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Shield, Users } from "lucide-react";
import Spline from '@splinetool/react-spline';

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero min-h-screen flex items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-legal-primary/10 via-transparent to-legal-primary-dark/5"></div>
      
      <div className="container mx-auto px-4 relative w-full">
        <div className="flex flex-col lg:flex-row gap-12 items-center min-h-[80vh]">
          <div className="text-center lg:text-left lg:w-1/2">
            <h1 className="text-5xl lg:text-7xl font-bold text-primary-foreground mb-8 leading-tight">
              Your AI Legal Assistant
              <span className="block text-legal-accent">Is Here</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-primary-foreground/80 mb-10 max-w-3xl leading-relaxed">
              Meet your intelligent legal companion! Our AI robot analyzes documents, explains complex terms, 
              and provides instant legal guidance 24/7. Smart, fast, and always ready to help.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-legal-accent text-legal-primary hover:bg-legal-accent/90 shadow-hover transition-all duration-300 text-xl px-8 py-4"
              >
                🤖 Chat with AI
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary-foreground text-primary-foreground bg-primary-foreground/10 hover:bg-primary-foreground/20 text-xl px-8 py-4"
                onClick={() => window.location.href = '/features'}
              >
                🚀 Explore Features
              </Button>
            </div>

            <div className="flex items-center justify-center lg:justify-start space-x-12 mt-16">
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-primary-foreground/10 rounded-lg mb-3">
                  <FileText className="h-8 w-8 text-primary-foreground" />
                </div>
                <p className="text-lg text-primary-foreground/70">Document Analysis</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-primary-foreground/10 rounded-lg mb-3">
                  <Shield className="h-8 w-8 text-primary-foreground" />
                </div>
                <p className="text-lg text-primary-foreground/70">Risk Assessment</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-primary-foreground/10 rounded-lg mb-3">
                  <Users className="h-8 w-8 text-primary-foreground" />
                </div>
                <p className="text-lg text-primary-foreground/70">Lawyer Connect</p>
              </div>
            </div>
          </div>

          <div className="relative lg:w-1/2 overflow-visible">
            <Spline
              scene="https://prod.spline.design/rU2-Ks0SC0T5od9B/scene.splinecode"
              style={{ width: '160%', height: '950px', marginLeft: '10%' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
