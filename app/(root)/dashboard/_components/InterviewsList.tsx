import { getUserInterviews } from "@/lib/actions/interviews";
import React from "react";
import InterviewsListSkeleton from "./InterviewsListSkeleton";
import InterviewCard from "./InterviewCard";

const InterviewsList = async () => {
  const userInterviews = await getUserInterviews();
  if (!userInterviews.data) return <p>No Interviews Found.</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold">My Mock Interviews</h2>
      {userInterviews?.total > 0 ? (
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
          {userInterviews.data.map((interview) => (
            <div key={interview?.id} className="w-full">
              <InterviewCard interview={interview as InterviewType} />
            </div>
          ))}
        </div>
      ) : (
        <InterviewsListSkeleton />
      )}
    </div>
  );
};

export default InterviewsList;
