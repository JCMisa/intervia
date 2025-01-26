import React from "react";
import InterviewHeader from "./_components/InterviewHeader";
import InterviewData from "./_components/InterviewData";
import WebCamDisplay from "./_components/WebCamDisplay";

const InterviewLayoutPage = async ({
  params,
}: {
  params: Promise<{ interviewId: string }>;
}) => {
  const interviewId = (await params)?.interviewId;

  return (
    <div>
      <InterviewHeader />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-20">
        {/* interview data */}
        <InterviewData interviewId={interviewId} />

        {/* webcam */}
        <WebCamDisplay />
      </div>
    </div>
  );
};

export default InterviewLayoutPage;
