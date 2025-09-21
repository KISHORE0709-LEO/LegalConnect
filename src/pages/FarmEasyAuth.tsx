import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, Lock, User, Phone, Eye, EyeOff, Google } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
};

const rotateAnimation = {
  animate: { rotate: 360 },
  transition: { repeat: Infinity, duration: 10, ease: "linear" },
};

export default function FarmEasyAuth() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full bg-white/90 backdrop-blur-md p-8 shadow-2xl rounded-lg">
        <motion.div
          className="flex flex-col items-center mb-6"
          {...rotateAnimation}
          animate="animate"
          transition="transition"
        >
          <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-full p-4 mb-4">
            <motion.span
              className="text-4xl"
              role="img"
              aria-label="farm emoji"
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            >
              🌾
            </motion.span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            {mode === "login" ? "Welcome Back" : "Join FarmEasy"}
          </h2>
          <p className="text-gray-600 mt-1">
            {mode === "login"
              ? "Sign in to your account"
              : "Create your farming account"}
          </p>
        </motion.div>

        <div className="flex justify-center mb-6 relative bg-gray-100 rounded-full p-1 w-full max-w-xs mx-auto">
          <button
            className={`flex-1 py-2 rounded-full font-semibold transition-colors duration-300 ${
              mode === "login"
                ? "text-green-700 bg-white shadow"
                : "text-gray-500"
            }`}
            onClick={() => setMode("login")}
          >
            Login
          </button>
          <button
            className={`flex-1 py-2 rounded-full font-semibold transition-colors duration-300 ${
              mode === "signup"
                ? "text-green-700 bg-white shadow"
                : "text-gray-500"
            }`}
            onClick={() => setMode("signup")}
          >
            Sign Up
          </button>
          <motion.div
            className="absolute top-1 left-1 bg-green-200 rounded-full w-1/2 h-10 shadow transition-all"
            layout
          />
        </div>

        <form className="space-y-4">
          {mode === "signup" && (
            <>
              <div>
                <Label htmlFor="fullName" className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  Full Name
                </Label>
                <Input id="fullName" type="text" placeholder="John Doe" />
              </div>
              <div>
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  Phone Number
                </Label>
                <Input id="phone" type="tel" placeholder="+1 234 567 890" />
              </div>
            </>
          )}

          <div>
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-400" />
              Email
            </Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>

          <div>
            <Label htmlFor="password" className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-gray-400" />
              Password
              <button
                type="button"
                className="ml-auto text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </Label>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="********"
            />
          </div>

          {mode === "signup" && (
            <div>
              <Label htmlFor="confirmPassword" className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-gray-400" />
                Confirm Password
                <button
                  type="button"
                  className="ml-auto text-gray-500 hover:text-gray-700"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </Label>
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="********"
              />
            </div>
          )}

          {mode === "login" && (
            <div className="flex items-center justify-between text-sm text-gray-600">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="form-checkbox" />
                Remember me
              </label>
              <a href="#" className="hover:underline">
                Forgot password?
              </a>
            </div>
          )}

          <Button type="submit" className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
            {mode === "login" ? "Sign In" : "Create Account"}
          </Button>

          <Separator className="my-4" />

          <Button variant="outline" className="w-full flex items-center justify-center gap-2 border-green-600 text-green-600 hover:bg-green-50">
            <Google className="w-5 h-5" />
            Continue with Google
          </Button>
        </form>
      </Card>
    </div>
  );
}
