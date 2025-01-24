"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { LayoutGrid, Settings, Telescope, WalletCards } from "lucide-react";

const SideNav = ({ isShow }: { isShow: boolean }) => {
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: <LayoutGrid />,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Explore",
      icon: <Telescope />,
      path: "/dashboard/explore",
    },
    {
      id: 3,
      name: "Upgrade",
      icon: <WalletCards />,
      path: "/dashboard/upgrade",
    },
    {
      id: 4,
      name: "Settings",
      icon: <Settings />,
      path: "/dashboard/setting",
    },
  ];

  const path = usePathname();

  return (
    <div>
      {isShow && (
        <div className="h-screen p-5 border shadow-md transition-all relative">
          <Link href={"/"}>
            <div className="flex items-center cursor-pointer">
              <Image src={"/logo.svg"} alt="logo" width={40} height={40} />
              <Image
                src={"/logo-full.png"}
                alt="logo-full"
                width={130}
                height={130}
                className="-ml-3"
              />
            </div>
          </Link>
          <div className="mt-5">
            {menuList.map((menu, index) => (
              <Link href={menu.path} key={menu.id || index}>
                <div>
                  <h2
                    className={`flex gap-2 items-center font-medium p-5 cursor-pointer rounded-md text-dark-200 dark:text-light-200 hover:bg-primary transition-all mb-2 ${
                      path === menu.path &&
                      "text-dark dark:text-light bg-primary"
                    }`}
                  >
                    {menu.icon}
                    {menu.name}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
          <div className="absolute bottom-10 left-3 w-[80%]">
            {/* <UsageTrack /> */}
            UsageTrack
          </div>
        </div>
      )}
    </div>
  );
};

export default SideNav;
