import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Shield, Users, Brain, Target, Lightbulb } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-legal-accent">
              Generative AI
            </span>
            <br />
            <span className="text-legal-accent">
              for Demystifying Legal Documents
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Develop an AI solution that simplifies complex legal documents into clear, accessible guidance, 
            empowering users to make informed decisions.
          </p>
        </div>

        {/* Challenge Section */}
        <Card className="mb-12 border-2 border-red-200 bg-red-50/50">
          <CardContent className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-red-100 rounded-lg">
                <Shield className="h-8 w-8 text-red-600" />
              </div>
              <h2 className="text-3xl font-bold text-red-800">Challenge</h2>
            </div>
            <p className="text-lg text-red-700 leading-relaxed">
              Legal documents—such as rental agreements, loan contracts, and terms of service—are often filled 
              with complex, impenetrable jargon that is incomprehensible to the average person. This creates a 
              significant information asymmetry, where individuals may unknowingly agree to unfavorable terms, 
              exposing them to financial and legal risks. There is a pressing need for a tool that can bridge 
              this gap, making essential legal information accessible and understandable to everyone, from 
              everyday citizens to small business owners.
            </p>
          </CardContent>
        </Card>

        {/* Objective Section */}
        <Card className="mb-12 border-2 border-blue-200 bg-blue-50/50">
          <CardContent className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-blue-800">Objective</h2>
            </div>
            <p className="text-lg text-blue-700 leading-relaxed mb-6">
              Develop a creative and intelligent solution using Google Cloud's generative AI to demystify 
              complex legal documents. The solution should be a reliable first point of contact, offering 
              a private, safe, and supportive environment for users.
            </p>
            <p className="text-lg text-blue-700 leading-relaxed">
              Participants are encouraged to design platforms, applications, or tools that can provide clear 
              summaries, explain complex clauses, and answer user queries in a simple, practical manner, 
              ultimately empowering individuals to make informed decisions and protect themselves from legal 
              and financial risks.
            </p>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="border-2 border-green-200 bg-green-50/50 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="p-4 bg-green-100 rounded-full w-fit mx-auto mb-4">
                <FileText className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-3">Clear Summaries</h3>
              <p className="text-green-700">Transform complex legal jargon into simple, understandable summaries</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200 bg-purple-50/50 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="p-4 bg-purple-100 rounded-full w-fit mx-auto mb-4">
                <Brain className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-purple-800 mb-3">AI-Powered Analysis</h3>
              <p className="text-purple-700">Leverage Google Cloud's generative AI for intelligent document analysis</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-200 bg-orange-50/50 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="p-4 bg-orange-100 rounded-full w-fit mx-auto mb-4">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-orange-800 mb-3">User Empowerment</h3>
              <p className="text-orange-700">Enable informed decision-making for everyone, from citizens to businesses</p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-hero rounded-2xl p-12 text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-legal-primary/10 via-transparent to-legal-primary-dark/5"></div>
          <div className="relative z-10">
            <Lightbulb className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl font-bold mb-4">Ready to Demystify Legal Documents?</h2>
            <p className="text-xl mb-8 opacity-90">Join us in making legal information accessible to everyone</p>
            <Button 
              size="lg" 
              className="bg-legal-accent text-legal-primary hover:bg-legal-accent/90 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Started Today
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;