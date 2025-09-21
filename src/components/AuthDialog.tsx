import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode?: "login" | "signup";
}

export const AuthDialog = ({ open, onOpenChange, mode = "login" }: AuthDialogProps) => {
  const { toast } = useToast();
  const { login, signup } = useAuth();
  const [activeMode, setActiveMode] = useState<"login" | "signup">(mode);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => setActiveMode(mode), [mode]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!email || !password || (activeMode === "signup" && !name)) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        return;
      }

      if (activeMode === "login") {
        await login(email, password);
        toast({
          title: "Welcome back!",
          description: "You are now logged in.",
        });
      } else {
        await signup(email, password, { fullName: name });
        toast({
          title: "Account created",
          description: "Let's set up your profile.",
        });
        
        onOpenChange(false);
        setName("");
        setEmail("");
        setPassword("");
        
        // Force redirect to persona selection
        setTimeout(() => {
          window.location.replace('/persona-selection');
        }, 500);
        return;
      }
      
      onOpenChange(false);
      setName("");
      setEmail("");
      setPassword("");
    } catch (error: any) {
      toast({
        title: "Authentication Error",
        description: error.message || "An error occurred during authentication.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-gradient-card">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-legal-primary to-legal-primary-dark bg-clip-text text-transparent">
            {activeMode === "login" ? "Sign In" : "Create Account"}
          </DialogTitle>
          <DialogDescription>
            {activeMode === "login"
              ? "Access your Legal Connect dashboard."
              : "Join Legal Connect to simplify your legal documents."}
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-lg p-4 border border-legal-primary/20 bg-gradient-to-br from-legal-primary/5 to-legal-primary-dark/5">
          <form onSubmit={onSubmit} className="space-y-4">
            {activeMode === "signup" && (
              <div className="grid gap-2">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" placeholder="Jane Doe" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <Button type="submit" disabled={loading} className="w-full bg-gradient-primary shadow-legal">
              {loading ? (activeMode === "login" ? "Signing in..." : "Creating account...") : activeMode === "login" ? "Sign In" : "Create Account"}
            </Button>
          </form>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          {activeMode === "login" ? (
            <button
              type="button"
              onClick={() => setActiveMode("signup")}
              className="text-legal-primary hover:underline"
            >
              Need an account? Sign up
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setActiveMode("login")}
              className="text-legal-primary hover:underline"
            >
              Already have an account? Sign in
            </button>
          )}
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Secure authentication powered by Firebase.
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
