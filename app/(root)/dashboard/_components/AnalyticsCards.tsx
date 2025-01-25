import { Progress } from "@/components/ui/progress";
import {
  ChartBarStackedIcon,
  CreditCardIcon,
  ListIcon,
  PlusSquareIcon,
} from "lucide-react";
import React from "react";
import AnalyticsCardsSkeleton from "./AnalyticsCardsSkeleton";
import { NumberTicker } from "@/components/ui/number-ticker";

const AnalyticsCards = () => {
  const totalInterviews = 0;
  const mostUsedCategory = "Technology";
  const creditsLeft = 50;
  // const totalInterviews = null;
  // const mostUsedCategory = "";
  // const creditsLeft = null;

  return (
    <>
      {totalInterviews || mostUsedCategory || creditsLeft ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
          {/* Total Mockup Interviews */}
          <div className="w-full mx-auto bg-light-100 shadow-md rounded-lg overflow-hidden dark:bg-dark-100">
            <div className="flex justify-between items-center px-6 py-4">
              <div className="flex items-center">
                <ListIcon className="h-6 w-6 text-primary" />
                <div className="mx-3">
                  <NumberTicker
                    value={50}
                    className="whitespace-pre-wrap text-lg font-medium tracking-tighter text-black dark:text-white"
                  />
                  <p className="text-gray-500 dark:text-gray-400">
                    Total Mockup Interviews
                  </p>
                </div>
              </div>
              <PlusSquareIcon className="h-6 w-6 text-green-500 cursor-pointer" />
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center"></div>
            </div>
            <div className="px-6 py-4">
              <div className="flex items-center">
                <Progress
                  value={50}
                  className="w-full mx-3 bg-light-400 rounded overflow-hidden dark:bg-dark"
                />

                <p className="text-sm text-gray-500 dark:text-gray-400">50%</p>
              </div>
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-3">
                <span> This Month: </span>
                <span> 4 </span>
              </div>
            </div>
          </div>

          {/* Most Interview Category */}
          <div className="w-full mx-auto bg-light-100 shadow-md rounded-lg overflow-hidden dark:bg-dark-100 flex items-center justify-start relative">
            <div className="flex justify-between items-center px-6 py-4">
              <div className="flex flex-col gap-1">
                <h3 className="text-2xl font-medium text-gray-700 dark:text-gray-200">
                  Technology
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Most Used Category
                </p>
              </div>
            </div>
            <ChartBarStackedIcon className="h-6 w-6 text-yellow-500 absolute top-5 right-5" />
          </div>

          {/* Credits Left */}
          <div className="w-full mx-auto bg-light-100 shadow-md rounded-lg overflow-hidden dark:bg-dark-100 flex items-center justify-start relative">
            <div className="flex justify-between items-center px-6 py-4">
              <div className="flex flex-col gap-1">
                <h3 className="text-4xl font-medium text-gray-700 dark:text-gray-200">
                  <NumberTicker
                    value={50}
                    className="whitespace-pre-wrap tracking-tighter text-black dark:text-white"
                  />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    /100
                  </span>
                </h3>
                <p className="text-gray-500 dark:text-gray-400">Credits Left</p>
              </div>
            </div>
            <CreditCardIcon className="h-6 w-6 text-blue-500 absolute top-5 right-5" />
          </div>
        </div>
      ) : (
        <AnalyticsCardsSkeleton />
      )}
    </>
  );
};

export default AnalyticsCards;
