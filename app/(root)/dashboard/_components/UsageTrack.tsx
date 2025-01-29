"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { SparklesText } from "@/components/ui/sparkles-text";
import { getCurrentUser } from "@/lib/actions/users";
import Link from "next/link";
import { useEffect, useState } from "react";

const UsageTrack = () => {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getCurrentUser();
      if (userData.success) setUser(userData?.data as UserType);
    };
    fetchUser();
  }, []);

  if (!user) return null;

  const totalCredits: number = user?.credits ?? 0;
  const isPro: boolean = user?.isPro ?? false;

  const maxCredits = isPro ? Infinity : 5;

  return (
    <>
      {isPro ? (
        <SparklesText text="PRO PLAN" className="text-center text-lg" />
      ) : (
        <div className="m-5 w-full">
          <div className="bg-light-100 dark:bg-dark-100 rounded-lg p-3 shadow-lg">
            <h2 className="font-medium">Credits</h2>

            <Progress value={(totalCredits / maxCredits) * 100} />
            <h2 className="text-xs my-2">
              {totalCredits}/{maxCredits} credits used
            </h2>
          </div>
          <Link href={"/upgrade"} className="w-full my-3">
            <Button className="w-full my-3">Upgrade</Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default UsageTrack;
