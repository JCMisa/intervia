"use client";

import CustomUserButton from "@/components/custom/CustomUserButton";
import { getCurrentUser } from "@/lib/actions/users";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const InterviewHeader = () => {
  const [currentUser, setCurrentUser] = useState<UserType>();
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const getCurrentUserEffect = async () => {
      const result = await getCurrentUser();
      if (result.success) setCurrentUser(result.data as UserType);
    };
    getCurrentUserEffect();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

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

      <div className="flex items-center gap-5">
        {/* current time and date */}
        <div className="text-lg text-gray-500 dark:text-gray-300">
          {formatDate(currentDate)}
        </div>

        <div className="flex items-center gap-2">
          <CustomUserButton />
          <div className="flex flex-col items-start">
            <p className="text-sm">
              {currentUser?.firstName || ""} {currentUser?.lastName || ""}
            </p>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {currentUser?.email || ""}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewHeader;
