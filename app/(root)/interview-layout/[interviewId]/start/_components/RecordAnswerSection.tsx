"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { LoaderCircleIcon } from "lucide-react";
import { toast } from "sonner";
import moment from "moment";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { getCurrentUser } from "@/lib/actions/users";
import { v4 as uuidv4 } from "uuid";

const RecordAnswerSection = ({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData, // it was the record found by mockId in page.jsx of start directory
}: {
  mockInterviewQuestion: QuestionListType[];
  activeQuestionIndex: number;
  interviewData: InterviewType;
}) => {
  const {
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  const [userAnswerRecorded, setUserAnswerRecorded] = useState("");
  const [userAnswerTyped, setUserAnswerTyped] = useState("");
  const [loading, setLoading] = useState(false);
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserType>();

  useEffect(() => {
    const getCurrentUserEffect = async () => {
      const data = await getCurrentUser();
      if (data.success) setCurrentUser(data.data as UserType);
    };
    getCurrentUserEffect();
  }, []);

  useEffect(() => {
    if (results.length > 0) {
      const newTranscript = results
        .filter((result) => typeof result !== "string")
        .map((result) => result.transcript)
        .join(" ");

      if (newTranscript) {
        setUserAnswerRecorded((prev) => prev + " " + newTranscript);
      }
    }
  }, [results]);

  const StartStopRecording = async () => {
    if (isRecording) {
      console.log("recording stopped");
      stopSpeechToText();
    } else {
      console.log("recording started");
      startSpeechToText();
    }
  };

  useEffect(() => {
    if (!isRecording && userAnswerRecorded.length > 10) {
      SaveUserAnswer();
      console.log(
        `answer from recording question #${activeQuestionIndex}: `,
        userAnswerRecorded
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAnswerRecorded, isRecording]);

  const handleSave = async () => {
    SaveUserAnswer();
    console.log(
      `answer from textarea question #${activeQuestionIndex}: `,
      userAnswerTyped
    );
  };

  const SaveUserAnswer = async () => {
    try {
      setLoading(true);

      const feedbackPrompt = `Question: ${
        mockInterviewQuestion[activeQuestionIndex]?.question
      }, User Answer: ${
        userAnswerTyped || userAnswerRecorded
      }, Depends on question and user answer for given question, please give us the rating for the answer, and a short feedback to the answer if it needs improvement or not, in just 3 to 5 sentences in JSON format with rating and feedback properties with their corresponding values.`;

      const result = await axios.post("/api/generate-feedback", {
        prompt: feedbackPrompt,
      });

      if (result.status === 200) {
        console.log("feedback generated by ai: ", result?.data);
        const aiResponse = result?.data;

        const answerId = uuidv4();

        const data = await saveAnswerToDb(
          answerId,
          interviewData?.interviewId,
          currentUser?.id,
          currentUser?.email,
          mockInterviewQuestion[activeQuestionIndex]?.question,
          mockInterviewQuestion[activeQuestionIndex]?.answer,
          userAnswerTyped || userAnswerRecorded,
          aiResponse?.feedback,
          aiResponse?.rating,
          moment().format("MM-DD-YYYY")
        );

        if (data.success) {
          toast(
            <div className="text-green-500 text-sm">
              User answer saved successfully!
            </div>
          );

          setUserAnswerTyped("");
          setUserAnswerRecorded("");
          setResults([]);
        }

        setResults([]);
      }
    } catch (error) {
      console.log("saving answer error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-start justify-between gap-10 w-full">
      <div className="w-full flex flex-col gap-3">
        <div>
          <h2 className="text-4xl">Type your answer here</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Click submit before you continue to the next question to save your
            answer.
          </p>
        </div>
        <Textarea
          rows={12}
          placeholder="Enter your answer here"
          onChange={(e) => setUserAnswerTyped(e.target.value)}
        />
        <Button onClick={handleSave} disabled={loading}>
          {loading ? (
            <LoaderCircleIcon className="w-5 h-5 animate-spin" />
          ) : (
            "Save"
          )}
        </Button>
      </div>

      <span className="bg-primary rounded-full p-2 min-w-10 max-w-10 text-center">
        or
      </span>

      <div className="w-full flex flex-col gap-3">
        <div>
          <h2 className="text-4xl">
            Record your answer through speech to text
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Click stop recording before you continue to the next question to
            save your answer.
          </p>
        </div>
        <div className="flex justify-center items-center flex-col bg-light-100 dark:bg-dark-100 rounded-lg">
          <div className="flex flex-col justify-center items-center bg-light-100 dark:bg-dark-100 rounded-lg p-6 mt-20">
            {webcamEnabled ? (
              <Webcam
                onUserMedia={() => setWebcamEnabled(true)}
                onUserMediaError={() => setWebcamEnabled(false)}
                mirrored={true}
                style={{
                  height: 300,
                  width: "100%",
                  zIndex: 10,
                }}
              />
            ) : (
              <Image
                src={"/webcam.png"}
                alt="webcam"
                width={300}
                height={300}
                className="absolute cursor-pointer"
                onClick={() => setWebcamEnabled(true)}
              />
            )}
          </div>

          <div className="flex flex-row gap-2 justify-between mt-14 p-5">
            {isRecording ? (
              <Button
                disabled={loading}
                variant="destructive"
                className="min-w-32 max-w-32"
                onClick={() => StartStopRecording()}
              >
                {loading ? (
                  <LoaderCircleIcon className="w-5 h-5 animate-spin" />
                ) : (
                  <span className="flex flex-row gap-2 items-center">
                    Stop Recording
                  </span>
                )}
              </Button>
            ) : (
              <Button
                disabled={loading}
                className="min-w-32 max-w-32"
                onClick={() => StartStopRecording()}
              >
                {loading ? (
                  <LoaderCircleIcon className="w-5 h-5 animate-spin" />
                ) : (
                  <span className="flex flex-row gap-2 items-center">
                    Record Answer
                  </span>
                )}
              </Button>
            )}

            {webcamEnabled ? (
              <Button
                onClick={() => setWebcamEnabled(false)}
                variant={"destructive"}
                className="min-w-32 max-w-32"
              >
                Close Camera
              </Button>
            ) : (
              <Button
                onClick={() => setWebcamEnabled(true)}
                className="min-w-32 max-w-32"
              >
                Open Camera
              </Button>
            )}
          </div>
          {/* <Button className="my-10" onClick={() => console.log(userAnswer)}>
        Show user answer
      </Button> */}
        </div>
      </div>
    </div>
  );
};

export default RecordAnswerSection;
