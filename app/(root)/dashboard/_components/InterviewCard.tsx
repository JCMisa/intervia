import { getCurrentUser, getUserByInterviewUserId } from "@/lib/actions/users";
import { ZapIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

const InterviewCard = async ({ interview }: { interview: InterviewType }) => {
  const user = await getCurrentUser();
  if (!user?.data) return <p>Unauthenticated</p>;
  const currentUser = user?.data;

  const interviewCreator = await getUserByInterviewUserId(interview?.userId);
  const interviewCreatorData = interviewCreator?.data;

  return (
    <div className="w-full">
      <div className="group flex flex-col justify-start items-start gap-2 w-full h-56 duration-500 relative rounded-lg p-4 bg-light-100 dark:bg-dark-100 hover:-translate-y-2 hover:shadow-xl shadow-light-200 dark:shadow-primary">
        {interview?.createdBy !== currentUser?.email && (
          <div className="absolute duration-700 shadow-md group-hover:-translate-y-4 group-hover:-translate-x-4 -bottom-10 -right-10 w-[70%] h-1/2 rounded-lg bg-light-200 dark:bg-dark-200 p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image
                  src={(interviewCreatorData?.imageUrl as string) || ""}
                  alt="avatar"
                  width={1000}
                  height={1000}
                  className="w-10 h-10 rounded-full"
                />
                <p className="text-sm">
                  {interviewCreatorData?.firstName}{" "}
                  {interviewCreatorData?.lastName}
                </p>
              </div>

              <div className="bg-light dark:bg-dark p-2 w-10 h-10 rounded-full flex items-center justify-center">
                <ZapIcon
                  className={`w-4 h-4 ${
                    interviewCreatorData?.isPro
                      ? "text-yellow-500"
                      : "text-gray-500"
                  }`}
                />
              </div>
            </div>

            <span className="text-xs text-gray-500 dark:text-gray-400 absolute bottom-5 right-5">
              {interviewCreatorData?.email}
            </span>
          </div>
        )}

        <div className="">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-2xl font-bold mb-2">
              {interview?.jobTitle || ""}
            </h2>
            <p className="text-sm text-primary">
              {interviewCreatorData?.email === currentUser?.email && "owner"}
            </p>
          </div>
          <p className="text-gray-500 dark:text-gray-400 line-clamp-3">
            {interview?.jobDescription || ""}
          </p>
        </div>
        <button className="hover:bg-light-200 dark:hover:bg-dark-200 transition-all ease-in-out bg-light dark:bg-dark mt-6 rounded p-2 px-6">
          Explore
        </button>
      </div>
    </div>
  );
};

export default InterviewCard;
