"use client";

import React, { useEffect, useState } from "react";
import InterviewHeader from "../_components/InterviewHeader";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";
import { getUserAnswersByInterviewId } from "@/lib/actions/answers";
import { getCurrentUser } from "@/lib/actions/users";
import { ArrowLeft, StarIcon } from "lucide-react";
import FeedbackSkeleton from "./_components/FeedbackSkeleton";
import Link from "next/link";

const FeedbackPage = ({
  params,
}: {
  params: Promise<{ interviewId: string }>;
}) => {
  const confetti = useConfettiStore();

  const [interviewId, setInterviewId] = useState("");
  const [userAnswers, setUserAnswers] = useState<UserAnswerType[]>([]);
  const [currentUser, setCurrentUser] = useState<UserType>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCurrentUserEffect = async () => {
      const user = await getCurrentUser();
      if (user?.data && user?.success) setCurrentUser(user?.data as UserType);
    };
    getCurrentUserEffect();
  }, []);

  useEffect(() => {
    const extractInterviewId = async () => {
      const id = (await params).interviewId;
      setInterviewId(id);
    };
    extractInterviewId();
  }, [params]);

  useEffect(() => {
    const getUserAnswers = async () => {
      setLoading(true);
      try {
        const result = await getUserAnswersByInterviewId(
          interviewId,
          currentUser?.email as string
        );
        if (result.success && result.data) {
          setUserAnswers(result?.data as UserAnswerType[]);
        }
      } catch {
        toast(
          <p className="text-sm font-bold text-red-500">
            Internal error occured while fetching user answers
          </p>
        );
      } finally {
        setLoading(false);
      }
    };

    getUserAnswers();
  }, [interviewId, currentUser?.email]);

  useEffect(() => {
    confetti.onOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interviewId]);

  return (
    <div>
      <InterviewHeader />

      <div className="p-20">
        <Link
          href={"/dashboard"}
          className="flex items-center gap-2 text-gray-500 dark:text-gray-400 cursor-pointer mb-10"
        >
          <ArrowLeft />
          <p className="text-sm">Back to dashboard</p>
        </Link>

        <h1 className="text-6xl font-semibold text-center mb-8">
          Your Interview Feedback
        </h1>

        {!loading ? (
          <Accordion type="single" collapsible className="w-full">
            {userAnswers?.length > 0 &&
              userAnswers?.map((answer, index) => (
                <AccordionItem key={index} value={`item-${index + 1}`}>
                  <AccordionTrigger className="text-3xl font-medium tracking-wide">
                    {answer.question}
                  </AccordionTrigger>
                  <AccordionContent className="py-3 px-10">
                    <div className="flex flex-col gap-5">
                      <div className="flex flex-col gap-2">
                        <h2 className="text-xl font-bold">Your Answer</h2>
                        <p className="text-md tracking-wide text-gray-500 dark:text-gray-400">
                          {answer.userAnswer}
                        </p>
                      </div>

                      <div className="flex flex-col gap-2">
                        <h2 className="text-xl font-bold">Answer Feedback</h2>
                        <p className="text-md tracking-wide text-gray-500 dark:text-gray-400">
                          {answer.feedback}
                        </p>
                      </div>

                      <div className="flex flex-col gap-2">
                        <h2 className="text-xl font-bold">
                          Suggested/Possible Answer
                        </h2>
                        <p className="text-md tracking-wide text-gray-500 dark:text-gray-400">
                          {answer.correctAnswer}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <StarIcon className="text-yellow-500 w-5 h-5" />
                          {answer.rating > "0" ? (
                            <p className="text-sm">{answer.rating}</p>
                          ) : (
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              No rating provided
                            </p>
                          )}
                        </div>

                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {answer.createdAt}
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        ) : (
          <FeedbackSkeleton />
        )}
      </div>
    </div>
  );
};

export default FeedbackPage;
