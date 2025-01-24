"use client";

import { AlignJustify, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import CustomUserButton from "../../../../components/custom/CustomUserButton";

const routes = [
  {
    name: "home",
    path: "/",
  },
  {
    name: "dashboard",
    path: "/dashboard",
  },
  {
    name: "Explore",
    path: "/dashboard/explore",
  },
  {
    name: "Upgrade",
    path: "/dashboard/upgrade",
  },
  {
    name: "Settings",
    path: "/dashboard/setting",
  },
];

const DashboardHeader = ({ showSideNav }: { showSideNav: VoidFunction }) => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");

  const navigateToRoute = () => {
    const filteredRoutes = routes.filter((route) =>
      route.name.toLowerCase().includes(searchInput.trim().toLowerCase())
    );

    if (filteredRoutes.length === 0) {
      router.push("/dashboard");
      return;
    }
    router.push(filteredRoutes[0].path);
  };

  return (
    <div className="p-5 shadow-md border-b flex justify-between items-center">
      <div className="md:flex flex-row gap-5 items-center hidden">
        <div className="cursor-pointer">
          <AlignJustify onClick={showSideNav} />
        </div>
        <div className="flex flex-row gap-3 items-center border border-gray-400 dark:border-light px-5 rounded-lg">
          <Search
            className="cursor-pointer"
            onClick={() => navigateToRoute()}
          />
          <input
            type="text"
            placeholder="Search..."
            className="p-2 focus:outline-none focus:ring-0 bg-light dark:bg-dark"
            name="searchInput"
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>

      <Link href={"/"}>
        <div className="flex md:hidden items-center cursor-pointer">
          <Image src={"/logo.svg"} alt="logo" width={40} height={40} />
          <Image
            src={"/logo-full.png"}
            alt="logo-full"
            width={130}
            height={130}
            className="-ml-3 hidden sm:block"
          />
        </div>
      </Link>

      <CustomUserButton />
    </div>
  );
};

export default DashboardHeader;
