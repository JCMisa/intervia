import React from "react";

const FeedbackSkeleton = () => {
  return (
    <div className="flex flex-col gap-5">
      {[1, 2, 3, 4, 5].map((item) => (
        <div
          key={item}
          className="w-full min-h-52 max-h-52 rounded-lg shadow-lg bg-light-100 dark:bg-dark-100 p-5 animate-pulse"
        >
          <div className="flex flex-col gap-5">
            <div className="w-[70%] min-h-10 max-h-10 bg-light dark:bg-dark animate-pulse rounded-lg"></div>

            <div className="flex items-end justify-between w-full">
              <div className="flex flex-col gap-2 w-full">
                <div className="w-[50%] min-h-10 max-h-10 bg-light dark:bg-dark animate-pulse rounded-lg"></div>
                <div className="w-[50%] min-h-10 max-h-10 bg-light dark:bg-dark animate-pulse rounded-lg"></div>
              </div>

              <div className="w-[20%] min-h-10 max-h-10 bg-light dark:bg-dark animate-pulse rounded-lg"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedbackSkeleton;
