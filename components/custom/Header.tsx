import Image from "next/image";
import React from "react";
import { Button } from "../../components/ui/button";
import Link from "next/link";
import { LockIcon, LogOutIcon } from "lucide-react";
import { SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <nav className="flex justify-between items-center p-5 shadow-lg w-full">
      <Link href={"/"} className="flex items-center cursor-pointer">
        <Image src={"/logo.svg"} alt="logo" width={40} height={40} />
        <Image
          src={"/logo-full.png"}
          alt="logo-full"
          width={130}
          height={130}
          className="-ml-3 hidden sm:block"
        />
      </Link>

      <SignedIn>
        <SignOutButton>
          <Button className="min-w-32 max-w-32 flex items-center justify-center gap-2">
            Sign Out <LogOutIcon className="w-4 h-4" />
          </Button>
        </SignOutButton>
      </SignedIn>
      <SignedOut>
        <Link href="/sign-in">
          <Button className="min-w-32 max-w-32 flex items-center justify-center gap-2">
            Sign in <LockIcon className="w-4 h-4" />
          </Button>
        </Link>
      </SignedOut>
    </nav>
  );
};

export default Header;
