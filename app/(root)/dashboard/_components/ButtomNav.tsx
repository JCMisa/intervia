import React from "react";
import { LayoutGrid, Settings, Telescope, WalletCards } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const ButtomNav = () => {
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
    <div className="shadow-lg min-h-20 border-t bg-light-100 dark:bg-dark-100">
      <div className="flex gap-5 sm:gap-10 md:hidden justify-center items-center text-center">
        {menuList.map((menu, index) => (
          <Link href={menu.path} key={menu.id || index}>
            <div className="py-3">
              <h2
                className={`flex gap-1 sm:gap-5 items-center text-dark-200 dark:text-light-200 font-medium p-2 sm:p-5 cursor-pointer rounded-md hover:bg-primary transition-all mb-2 ${
                  path == menu.path && "text-dark dark:text-light bg-primary"
                }`}
              >
                {menu.icon}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ButtomNav;
