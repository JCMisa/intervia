import Image from "next/image";
import React from "react";
import { Button } from "../../components/ui/button";
import Link from "next/link";
import { ArrowRightIcon, HomeIcon, LockIcon } from "lucide-react";
import { SignedIn, SignedOut } from "@clerk/nextjs";

const Header = () => {
  return (
    <div className="flex justify-between items-center p-5 shadow-lg w-full">
      <div className="flex items-center cursor-pointer">
        <Image src={"/logo.svg"} alt="logo" width={40} height={40} />
        <Image
          src={"/logo-full.png"}
          alt="logo-full"
          width={130}
          height={130}
          className="-ml-3 hidden sm:block"
        />
      </div>

      <ul className="flex items-center justify-center gap-3">
        <div>
          <li className="hidden md:block">Home</li>
          <HomeIcon className="w-5 h-5 block md:hidden" />
        </div>
        <div>
          <li className="hidden md:block">Home</li>
          <HomeIcon className="w-5 h-5 block md:hidden" />
        </div>
        <div>
          <li className="hidden md:block">Home</li>
          <HomeIcon className="w-5 h-5 block md:hidden" />
        </div>
        <div>
          <li className="hidden md:block">Home</li>
          <HomeIcon className="w-5 h-5 block md:hidden" />
        </div>
        <div>
          <li className="hidden md:block">Home</li>
          <HomeIcon className="w-5 h-5 block md:hidden" />
        </div>
      </ul>

      <SignedIn>
        <Link href="/dashboard">
          <Button className="min-w-32 max-w-32 flex items-center justify-center gap-2">
            Dashboard <ArrowRightIcon className="w-4 h-4" />
          </Button>
        </Link>
      </SignedIn>
      <SignedOut>
        <Link href="/sign-in">
          <Button className="min-w-32 max-w-32 flex items-center justify-center gap-2">
            Sign in <LockIcon className="w-4 h-4" />
          </Button>
        </Link>
      </SignedOut>
    </div>
  );
};

export default Header;
