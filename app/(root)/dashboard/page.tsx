import React from "react";
import AnalyticsCards from "./_components/AnalyticsCards";
import { getCurrentUser } from "@/lib/actions/users";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ZapIcon } from "lucide-react";

const DashboardPage = async () => {
  const user = await getCurrentUser();
  if (!user.success) return redirect("/sign-in");
  const currentUser = user.data;

  return (
    <div className="p-4">
      <div className="mb-5 flex flex-col sm:flex-row gap-3 items-center justify-between w-full">
        <div>
          <h2 className="text-4xl">Hello, {currentUser?.firstName}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Welcome to Intervia! Your AI assistant for acing job interviews.
            Let&apos;s get started! 🚀
          </p>
        </div>

        {(currentUser?.isPro && (currentUser?.credits || 0) < 5) ||
        (currentUser?.isPro && (currentUser?.credits || 0) >= 5) ||
        (!currentUser?.isPro && (currentUser?.credits || 0) < 5) ? (
          <Link href={"/create"} className="w-full sm:min-w-32 sm:max-w-32">
            <Button className="w-full sm:min-w-32 sm:max-w-32">+ Create</Button>
          </Link>
        ) : (
          <Link href={"/upgrade"} className="w-full sm:min-w-32 sm:max-w-32">
            <Button
              variant={"outline"}
              className="w-full sm:min-w-32 sm:max-w-32"
            >
              <ZapIcon className="text-yellow-500" /> Upgrade
            </Button>
          </Link>
        )}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-3">
        <div className="xl:col-span-3 flex flex-col gap-3 w-full">
          {/* analytics cards */}
          <div className="w-full">
            <AnalyticsCards />
          </div>
          {/* Interviews List */}
          <div>InterviewsList</div>
        </div>

        <div className="xl:col-span-1 bg-primary"></div>
      </div>
    </div>
  );
};

export default DashboardPage;
