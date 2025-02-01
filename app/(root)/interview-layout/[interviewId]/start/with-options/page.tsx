"use client";

import Link from "next/link";
import InterviewHeader from "../../_components/InterviewHeader";
import { ArrowLeftIcon, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { getInterviewByInterviewId } from "@/lib/actions/interviews";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import { getCurrentUser } from "@/lib/actions/users";
import moment from "moment";
import { saveAnswerToDb } from "@/lib/actions/answers";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const StartWithOptionsPage = ({
  params,
}: {
  params: Promise<{ interviewId: string }>;
}) => {
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<UserType>();
  const [interviewId, setInterviewId] = useState("");
  const [mockInterviewQuestions, setMockInterviewQuestions] = useState<
    QuestionListType[] | null
  >(null);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const extractParams = async () => {
      const id = (await params)?.interviewId;
      setInterviewId(id);
    };
    extractParams();
  }, [params]);

  useEffect(() => {
    const getInterviewData = async () => {
      if (interviewId) {
        try {
          const result = await getInterviewByInterviewId(interviewId);
          if (result.success) {
            const fetchedInterview = result.data as InterviewType;
            setMockInterviewQuestions(
              fetchedInterview.interviewData.questionsList || null
            );
          }
        } catch (error) {
          console.error("Failed to fetch interview data", error);
        }
      }
    };

    getInterviewData();
  }, [interviewId]);

  useEffect(() => {
    const getCurrentUserEffect = async () => {
      const user = await getCurrentUser();
      if (user.success) setCurrentUser(user.data as UserType);
    };

    getCurrentUserEffect();
  }, []);

  const handleClickOption = (questionIndex: number, option: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionIndex]: option,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (!mockInterviewQuestions) return;

    try {
      // Create array of save promises
      const savePromises = mockInterviewQuestions.map(
        async (question, index) => {
          const userAnswer = userAnswers[index] || "";
          const answerId = uuidv4();

          await saveAnswerToDb(
            answerId,
            interviewId,
            currentUser?.id as string,
            currentUser?.email as string,
            question.question,
            question.answer,
            userAnswer,
            question.explanation,
            "0",
            moment().format("MM-DD-YYYY")
          );

          return index; // Return the index of completed question
        }
      );

      // Wait for all promises to resolve
      const completedIndexes = await Promise.all(savePromises);
      const count = completedIndexes.length;

      toast(
        <p className="text-sm font-bold text-green-500">
          {`Successfully saved ${count}/${mockInterviewQuestions.length} answers`}
        </p>
      );

      router.push(`/interview-layout/${interviewId}/feedback`);
    } catch (error) {
      console.error("Error saving results:", error);
      toast(
        <p className="text-sm font-bold text-red-500">
          Error saving answers -{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <InterviewHeader />

      <div className="p-20">
        <Link
          href={`/interview-layout/${interviewId}`}
          className="text-xs tex-gray-500 dark:text-gray-400 flex items-center gap-2"
        >
          <ArrowLeftIcon />
          <p>Go Back</p>
        </Link>

        <div className="flex flex-col gap-10 mt-10">
          {mockInterviewQuestions?.map((question, questionIndex) => (
            <div key={questionIndex} className="flex flex-col gap-3">
              {/* question */}
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary font-bold text-sm p-3 w-10 h-10 text-center">
                  {questionIndex + 1}
                </div>
                <h2 className="text-lg font-bold tracking-wide">
                  {question.question}
                </h2>
              </div>

              {question.options.map((option, optionIndex) => (
                <Button
                  key={optionIndex}
                  className="flex items-center justify-start h-10 overflow-auto card-scroll-none"
                  variant={
                    userAnswers[questionIndex] === option
                      ? "default"
                      : "outline"
                  }
                  onClick={() => handleClickOption(questionIndex, option)}
                >
                  {option}
                </Button>
              ))}
            </div>
          ))}
        </div>
        <Button
          className="float-end my-10"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <LoaderCircle className="w-5 h-5 animate-spin" />
          ) : (
            "Submit"
          )}
        </Button>
      </div>
    </div>
  );
};

export default StartWithOptionsPage;
