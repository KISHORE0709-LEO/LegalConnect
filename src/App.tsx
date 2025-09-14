import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BasicInfo from "./pages/onboarding/BasicInfo";
import LegalNeeds from "./pages/onboarding/LegalNeeds";
import Contact from "./pages/onboarding/Contact";
import Summary from "./pages/onboarding/Summary";
import Success from "./pages/onboarding/Success";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/onboarding/basic-info" element={<BasicInfo />} />
          <Route path="/onboarding/legal-needs" element={<LegalNeeds />} />
          <Route path="/onboarding/contact" element={<Contact />} />
          <Route path="/onboarding/summary" element={<Summary />} />
          <Route path="/onboarding/success" element={<Success />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
