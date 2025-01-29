"use client";

import { getInterviewByInterviewId } from "@/lib/actions/interviews";
import React, { useEffect, useState } from "react";
import QuestionsSection from "../_components/QuestionsSection";
import RecordAnswerSection from "../_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import InterviewHeader from "../../_components/InterviewHeader";
import { ArrowLeftIcon } from "lucide-react";

const StartWithoutOptionsPage = ({
  params,
}: {
  params: Promise<{ interviewId: string }>;
}) => {
  const [interviewId, setInterviewId] = useState("");
  const [interview, setInterview] = useState<InterviewType>({
    id: "string",
    interviewId: "string",
    userId: "string",
    createdBy: "string",
    jobTitle: "",
    industry: "",
    jobDescription: "",
    skills: "",
    experienceLevel: "",
    keyCompetencies: "",
    education: "",
    interviewData: {
      jobTitle: "",
      industry: "",
      jobDescription: "",
      skills: "",
      experienceLevel: "",
      keyCompetencies: "",
      education: "",
      questionsList: [
        {
          question: "",
          answer: "",
          explanation: "",
          options: [""],
        },
      ],
    },
    createdAt: "",
  });
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState<
    QuestionListType[] | null
  >();
  const [activeQuestionIndex, setactiveQuestionIndex] = useState(0);

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
            setInterview(fetchedInterview);
            setMockInterviewQuestion(
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
        <div className="flex flex-col gap-10">
          {/* questions */}
          <QuestionsSection
            mockInterviewQuestion={mockInterviewQuestion as QuestionListType[]} // this is the array that consist of objects with question and answer properties
            activeQuestionIndex={activeQuestionIndex} // this is the index of the question that is active
          />

          <div className="flex justify-end gap-6 my-3">
            {activeQuestionIndex > 0 && (
              <Button
                onClick={() => setactiveQuestionIndex(activeQuestionIndex - 1)} // decrement the index of the active question
                variant="outline"
              >
                Previous Question
              </Button>
            )}
            {mockInterviewQuestion &&
              activeQuestionIndex != mockInterviewQuestion.length - 1 && (
                <Button
                  onClick={() =>
                    setactiveQuestionIndex(activeQuestionIndex + 1)
                  } // increment the index of the active question
                >
                  Next Question
                </Button>
              )}
            {mockInterviewQuestion &&
              activeQuestionIndex == mockInterviewQuestion.length - 1 && (
                <Link
                  href={`/interview-layout/${interview?.interviewId}/feedback`}
                >
                  <Button variant={"destructive"}>End Interview</Button>
                </Link>
              )}
          </div>

          {/* video/audio recording */}
          <RecordAnswerSection
            mockInterviewQuestion={mockInterviewQuestion as QuestionListType[]} // this is the array that consist of objects with question and answer properties
            activeQuestionIndex={activeQuestionIndex} // this is the index of the question that is active
            interviewData={interview} // this is the state that store the found record based on the id in the params
          />
        </div>
      </div>
    </div>
  );
};

export default StartWithoutOptionsPage;
