import { Button } from "@/components/ui/button";
import { getInterviewByInterviewId } from "@/lib/actions/interviews";
import { ActivityIcon, ClockIcon, MoreVerticalIcon } from "lucide-react";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";

const InterviewData = async ({ interviewId }: { interviewId: string }) => {
  const interview = (await getInterviewByInterviewId(interviewId)).data;

  return (
    <div>
      <h1 className="font-bold text-6xl">
        Job Interview Preparation <br />
        For <span className="text-primary">{interview?.jobTitle}</span> Position
      </h1>
      <p className="text-lg text-gray-500 dark:text-gray-400 line-clamp-6">
        {interview?.jobDescription}
      </p>

      <div className="w-full mt-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <ActivityIcon />
          <p className="text-xs">{interview?.experienceLevel}</p>
        </div>
        <div className="flex items-center gap-2">
          <ClockIcon />
          <p className="text-xs">{interview?.createdAt}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-col md:flex-row gap-3 w-full">
        <div className="flex items-center gap-1 w-full">
          <Popover>
            <PopoverTrigger>
              <MoreVerticalIcon className="cursor-pointer" />
            </PopoverTrigger>
            <PopoverContent>
              This option will present multiple-choice questions, allowing you
              to select an answer from a list of possible responses.
            </PopoverContent>
          </Popover>
          <Link
            href={`/interview-layout/${interviewId}/start/with-options`}
            className="w-full"
          >
            <Button className="w-full" variant={"outline"}>
              Continue with options
            </Button>
          </Link>
        </div>
        <div className="flex items-center gap-1 w-full">
          <Popover>
            <PopoverTrigger>
              <MoreVerticalIcon className="cursor-pointer" />
            </PopoverTrigger>
            <PopoverContent>
              This option will present open-ended questions, allowing you to
              type your response freely. It also allow you to transform your
              speech into text, making it easier to respond verbally.
            </PopoverContent>
          </Popover>
          <Link
            href={`/interview-layout/${interviewId}/start/without-options`}
            className="w-full"
          >
            <Button className="w-full">Continue without options</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InterviewData;
