import React from "react";

const InterviewsListSkeleton = () => {
  return (
    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      <div className="card-light dark:bg-dark-100 w-full min-h-60 p-3 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3 w-full">
          <div className="min-w-[80%] bg-light dark:bg-dark animate-pulse rounded-lg h-5"></div>
          <div className="min-w-[10%] rounded-lg bg0-light dark:bg-dark animate-pulse h-5"></div>
        </div>

        <div className="bg-light dark:bg-dark animate-pulse w-full h-32 rounded-lg"></div>

        <div className="min-w-[40%] max-w-[40%] h-10 bg-light dark:bg-dark animate-pulse rounded-lg"></div>
      </div>

      <div className="card-light dark:bg-dark-100 w-full min-h-60 p-3 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3 w-full">
          <div className="min-w-[80%] bg-light dark:bg-dark animate-pulse rounded-lg h-5"></div>
          <div className="min-w-[10%] rounded-lg bg0-light dark:bg-dark animate-pulse h-5"></div>
        </div>

        <div className="bg-light dark:bg-dark animate-pulse w-full h-32 rounded-lg"></div>

        <div className="min-w-[40%] max-w-[40%] h-10 bg-light dark:bg-dark animate-pulse rounded-lg"></div>
      </div>

      <div className="card-light dark:bg-dark-100 w-full min-h-60 p-3 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3 w-full">
          <div className="min-w-[80%] bg-light dark:bg-dark animate-pulse rounded-lg h-5"></div>
          <div className="min-w-[10%] rounded-lg bg0-light dark:bg-dark animate-pulse h-5"></div>
        </div>

        <div className="bg-light dark:bg-dark animate-pulse w-full h-32 rounded-lg"></div>

        <div className="min-w-[40%] max-w-[40%] h-10 bg-light dark:bg-dark animate-pulse rounded-lg"></div>
      </div>
    </div>
  );
};

export default InterviewsListSkeleton;
