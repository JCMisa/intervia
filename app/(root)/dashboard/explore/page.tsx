import { getAllInterviews } from "@/lib/actions/interviews";
import InterviewCard from "../_components/InterviewCard";

const ExplorePage = async () => {
  const interviews = await getAllInterviews();
  if (!interviews.data) return <p>No interviews found.</p>;

  return (
    <main className="relative pt-32 pb-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <div className="relative inline-block">
            <div className="absolute -inset-px bg-gradient-to-r from-pink-500 to-primary blur-xl opacity-10" />
            <h1
              className="relative text-5xl md:text-6xl lg:text-7xl font-semibold bg-gradient-to-r from-dark-100 to-dark-300
               dark:from-gray-100 dark:to-gray-300 text-transparent bg-clip-text mb-8"
            >
              Master Your <br />
              Next Interview with Intervia
            </h1>
          </div>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
            Prepare confidently with AI-powered tools designed to help you ace
            every question and land your dream job.
          </p>
        </div>
      </div>

      {interviews.data?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {interviews.data?.map((interview) => (
            <div key={interview?.id} className="w-full">
              <InterviewCard interview={interview as InterviewType} />
            </div>
          ))}
        </div>
      ) : (
        <p>No interviews found.</p>
      )}
    </main>
  );
};

export default ExplorePage;
