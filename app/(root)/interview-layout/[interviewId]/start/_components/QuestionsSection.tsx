"use client";

import { Button } from "@/components/ui/button";
import { Lightbulb, Volume1, Volume2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import OptionCard from "./OptionCard";

const QuestionsSection = ({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewId,
  showOptions = false,
}: {
  mockInterviewQuestion: QuestionListType[];
  activeQuestionIndex: number;
  interviewId: string;
  showOptions: boolean;
}) => {
  const [speaking, setSpeaking] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [userSelectedOption, setUserSelectedOption] = useState<string | null>(
    null
  );

  // this method will start your device speaker and read the text passed as parameter
  const textToSpeech = (text: string) => {
    setSpeaking(true);

    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
      setTimeout(() => {
        setSpeaking(false);
      }, 10000);
    } else {
      toast("Sorry, your browser does not support text to speech");
    }
  };

  return (
    mockInterviewQuestion && (
      <div className="p-5 shadow-lg rounded-lg my-10">
        <div
          className="grid grid-cols-2 md:gridcol3
       lg:grid-cols-4 gap-5"
        >
          {mockInterviewQuestion.map((question, index) => (
            <h2
              key={index}
              className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer ${
                activeQuestionIndex == index && "text-primary"
              }`}
            >
              Question #{index + 1}
            </h2>
          ))}
        </div>
        <h2 className="my-5 text-sm md:text-lg">
          {/* access the
          question property of the element at index number equal to
          activeQuestionIndex props */}
          {mockInterviewQuestion[activeQuestionIndex]?.question}
        </h2>

        <div
          onClick={() =>
            textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)
          }
        >
          {speaking ? (
            <Button disabled className="rounded-full flex items-center">
              <Volume2 />
            </Button>
          ) : (
            <Button className="rounded-full flex items-center">
              <Volume1 className="cursor-pointer" />
            </Button>
          )}
        </div>

        {/* options */}
        {showOptions && (
          <div className="my-5 flex flex-col gap-3 mt-10">
            <h2 className="text-sm text-gray-500 dark:text-gray-400">
              Choose the best answer possible.
            </h2>
            {mockInterviewQuestion[activeQuestionIndex]?.options.map(
              (option, index) => (
                <div key={option}>
                  <OptionCard
                    question={
                      mockInterviewQuestion[activeQuestionIndex]?.question
                    }
                    correctAnswer={
                      mockInterviewQuestion[activeQuestionIndex]?.answer
                    }
                    option={option}
                    index={index}
                    interviewId={interviewId}
                    selectedIndex={selectedIndex}
                    setSelectedIndex={setSelectedIndex}
                    userSelectedOption={userSelectedOption}
                    setUserSelectedOption={setUserSelectedOption}
                  />
                </div>
              )
            )}
          </div>
        )}

        <div className="border rounded-lg p-5 bg-blue-100 mt-20">
          <h2 className="flex gap-2 items-center text-primary">
            <Lightbulb />
            <strong>Note:</strong>
          </h2>
          <h2 className="text-xs text-primary-600 my-2">
            Record your answer by clicking the Record Answer button. The
            feedback will be provided at the end of the interview session along
            with the comparison of your answer and the expected answer for each
            question.
          </h2>
        </div>
      </div>
    )
  );
};

export default QuestionsSection;
