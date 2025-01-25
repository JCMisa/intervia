import React from "react";

const AnalyticsCardsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
      <div className="card-light dark:bg-dark-100 w-full">
        <div className="card__skeleton-light dark:bg-gradient-to-r dark:from-dark-100 dark:via-dark dark:to-dark-100 card__title-light dark:bg-dark"></div>
        <div className="card__skeleton-light dark:bg-gradient-to-r dark:from-dark-100 dark:via-dark dark:to-dark-100 card__description-light dark:bg-dark"></div>
      </div>

      <div className="card-light dark:bg-dark-100 w-full">
        <div className="card__skeleton-light dark:bg-gradient-to-r dark:from-dark-100 dark:via-dark dark:to-dark-100 card__title-light dark:bg-dark"></div>
        <div className="card__skeleton-light dark:bg-gradient-to-r dark:from-dark-100 dark:via-dark dark:to-dark-100 card__description-light dark:bg-dark"></div>
      </div>

      <div className="card-light dark:bg-dark-100 w-full">
        <div className="card__skeleton-light dark:bg-gradient-to-r dark:from-dark-100 dark:via-dark dark:to-dark-100 card__title-light dark:bg-dark"></div>
        <div className="card__skeleton-light dark:bg-gradient-to-r dark:from-dark-100 dark:via-dark dark:to-dark-100 card__description-light dark:bg-dark"></div>
      </div>
    </div>
  );
};

export default AnalyticsCardsSkeleton;
