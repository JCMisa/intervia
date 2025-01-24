import { SignInButton } from "@clerk/nextjs";
import { LogIn } from "lucide-react";

function LoginButton() {
  return (
    <SignInButton mode="modal">
      <button
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary hover:from-primary hover:to-primary-500 rounded-lg
             transition-all duration-200 font-medium shadow-lg min-w-32 max-w-32 justify-center"
      >
        <LogIn className="w-4 h-4 transition-transform" />
        <span>Sign In</span>
      </button>
    </SignInButton>
  );
}
export default LoginButton;
