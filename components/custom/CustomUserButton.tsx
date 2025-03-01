"use client";

import LoginButton from "@/components/custom/LoginButton";
import { SignedOut, UserButton } from "@clerk/nextjs";
import { User } from "lucide-react";

function CustomUserButton() {
  return (
    <>
      <UserButton>
        <UserButton.MenuItems>
          <UserButton.Link
            label="Profile"
            labelIcon={<User className="size-4" />}
            href="/profile"
          />
        </UserButton.MenuItems>
      </UserButton>

      <SignedOut>
        <LoginButton />
      </SignedOut>
    </>
  );
}
export default CustomUserButton;
