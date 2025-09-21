import { Scale } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-start">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-primary p-2.5 rounded-xl shadow-legal">
              <Scale className="h-7 w-7 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold font-legal text-gray-900 tracking-tight">Legal Connect</span>
              <span className="text-xs text-gray-500 font-medium tracking-wide">Professional Legal Services</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};