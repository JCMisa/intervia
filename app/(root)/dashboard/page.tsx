import React from "react";
import AnalyticsCards from "./_components/AnalyticsCards";

const DashboardPage = () => {
  return (
    <div className="p-4 grid grid-cols-1 xl:grid-cols-4 gap-3">
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
  );
};

export default DashboardPage;
