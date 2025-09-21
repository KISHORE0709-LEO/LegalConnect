import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Scale, Menu, X, User, Globe, ChevronDown } from "lucide-react";
import { AuthDialog } from "@/components/AuthDialog";
import { useAuth } from "@/contexts/AuthContext";

export const Header = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as { mode?: "login" | "signup" } | undefined;
      if (detail?.mode === "signup") setAuthMode("signup"); else setAuthMode("login");
      setAuthOpen(true);
    };
    window.addEventListener("open-auth", handler as EventListener);
    
    // Load Google Translate
    const loadGoogleTranslate = () => {
      if (!(window as any).googleTranslateLoaded) {
        (window as any).googleTranslateLoaded = true;
        
        (window as any).googleTranslateElementInit = () => {
          try {
            const elements = document.querySelectorAll('#google_translate_element');
            elements.forEach((element, index) => {
              if (element && !element.hasChildNodes()) {
                new (window as any).google.translate.TranslateElement({
                  pageLanguage: 'en',
                  includedLanguages: 'en,hi,te,ta,es,fr,de,zh,ja,ko,ar',
                  layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE
                }, element.id || `google_translate_element_${index}`);
              }
            });
          } catch (error) {
            console.warn('Google Translate initialization failed:', error);
          }
        };
        
        const script = document.createElement('script');
        script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.onerror = () => console.warn('Failed to load Google Translate script');
        document.head.appendChild(script);
      } else if ((window as any).google?.translate?.TranslateElement) {
        // Reinitialize if already loaded
        setTimeout(() => {
          const elements = document.querySelectorAll('#google_translate_element');
          elements.forEach((element, index) => {
            if (element && !element.hasChildNodes()) {
              new (window as any).google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'en,hi,te,ta,es,fr,de,zh,ja,ko,ar',
                layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE
              }, element.id || `google_translate_element_${index}`);
            }
          });
        }, 100);
      }
    };
    
    loadGoogleTranslate();
    
    return () => {
      window.removeEventListener("open-auth", handler as EventListener);
    };
  }, []);

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-sm h-20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-2 cursor-pointer group order-2 lg:order-1" onClick={() => window.location.href = '/'}>
            <div className="bg-gradient-primary p-1.5 rounded-lg shadow-legal group-hover:shadow-hover transition-all duration-300">
              <Scale className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold font-legal text-gray-900 tracking-tight">Legal Connect</span>
              <span className="text-sm text-gray-500 font-medium tracking-wide">Professional Legal Services</span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center space-x-8 flex-1 justify-center order-1 lg:order-2">
            <a href="/about" className="text-gray-600 hover:text-legal-primary font-medium transition-colors duration-200 relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-legal-primary transition-all duration-200 group-hover:w-full"></span>
            </a>
            <a href="/features" className="text-gray-600 hover:text-legal-primary font-medium transition-colors duration-200 relative group">
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-legal-primary transition-all duration-200 group-hover:w-full"></span>
            </a>
            <a href="/contact" className="text-gray-600 hover:text-legal-primary font-medium transition-colors duration-200 relative group">
              Contact/Support
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-legal-primary transition-all duration-200 group-hover:w-full"></span>
            </a>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-50/80 transition-all duration-200">
              <Globe className="h-4 w-4 text-gray-600 flex-shrink-0" />
              <div id="google_translate_element" className="translate-widget" key="desktop-translate"></div>
            </div>
          </nav>

          <div className="hidden lg:flex items-center space-x-4 order-3">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-gray-50 border border-gray-200">
                  <div className="w-8 h-8 bg-legal-primary rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{user.email}</span>
                </div>
                <Button variant="outline" className="border-gray-300 hover:border-legal-primary hover:text-legal-primary" onClick={logout}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button className="bg-gradient-primary text-white shadow-legal hover:shadow-hover transition-all duration-300 px-4 py-1.5 rounded-lg font-medium text-sm" onClick={() => { setAuthMode("login"); setAuthOpen(true); }}>
                Login
              </Button>
            )}
          </div>

          <button
            className="lg:hidden p-1 rounded-lg hover:bg-gray-100 transition-colors duration-200 order-4"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5 text-gray-700" /> : <Menu className="h-5 w-5 text-gray-700" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden mt-4 py-4 border-t border-gray-200 bg-white/80 backdrop-blur-sm rounded-lg">
            <nav className="flex flex-col space-y-3 px-2">
              <a href="/about" className="text-gray-600 hover:text-legal-primary font-medium py-2 px-3 rounded-lg hover:bg-gray-50 transition-all duration-200">
                About
              </a>
              <a href="/features" className="text-gray-600 hover:text-legal-primary font-medium py-2 px-3 rounded-lg hover:bg-gray-50 transition-all duration-200">
                Features
              </a>
              <a href="/contact" className="text-gray-600 hover:text-legal-primary font-medium py-2 px-3 rounded-lg hover:bg-gray-50 transition-all duration-200">
                Contact/Support
              </a>
              
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-50/80 transition-all duration-200 mt-2">
                <Globe className="h-4 w-4 text-gray-600 flex-shrink-0" />
                <div id="google_translate_element_mobile" className="translate-widget" key="mobile-translate"></div>
              </div>

              <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
                {user ? (
                  <>
                    <div className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-gray-50">
                      <div className="w-8 h-8 bg-legal-primary rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{user.email}</span>
                    </div>
                    <Button variant="outline" className="border-gray-300 hover:border-legal-primary hover:text-legal-primary" onClick={logout}>
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <Button className="bg-gradient-primary text-white shadow-legal hover:shadow-hover transition-all duration-300" onClick={() => { setAuthMode("signup"); setAuthOpen(true); }}>
                    Get Started
                  </Button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
      <AuthDialog open={authOpen} onOpenChange={setAuthOpen} mode={authMode} />
    </header>
  );
};