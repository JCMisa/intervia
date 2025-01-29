"use client";

import { Button } from "@/components/ui/button";
import { saveAnswerToDb } from "@/lib/actions/answers";
import { getCurrentUser } from "@/lib/actions/users";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

const OptionCard = ({
  question,
  correctAnswer,
  option,
  index,
  interviewId,
  selectedIndex,
  setSelectedIndex,
  userSelectedOption,
  setUserSelectedOption,
}: {
  question: string;
  correctAnswer: string;
  option: string;
  index: number;
  interviewId: string;
  selectedIndex: number | null;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number | null>>;
  userSelectedOption: string | null;
  setUserSelectedOption: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const [currentUser, setCurrentUser] = useState<UserType>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCurrentUserEffect = async () => {
      const data = await getCurrentUser();
      if (data.success) setCurrentUser(data.data as UserType);
    };
    getCurrentUserEffect();
  }, []);

  const saveUserAnswer = async (selectedOption: string) => {
    try {
      setLoading(true);

      const answerId = uuidv4();

      const data = await saveAnswerToDb(
        answerId,
        interviewId,
        currentUser?.id as string,
        currentUser?.email as string,
        question,
        correctAnswer,
        (userSelectedOption as string) || selectedOption,
        "",
        "",
        moment().format("MM-DD-YYYY")
      );

      if (data.success) {
        toast(
          <div className="text-green-500 text-sm">
            User answer saved successfully!
          </div>
        );
      }
    } catch (error) {
      console.log("saving answer error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <p>{option}</p>
      <p>{userSelectedOption}</p>
      <Button
        variant={selectedIndex === index ? "default" : "outline"}
        onClick={() => {
          setSelectedIndex(index);
          setUserSelectedOption(option);
          saveUserAnswer(option);
        }}
        disabled={loading}
        className="min-h-14 max-h-14 w-full flex items-start justify-start overflow-x-auto card-scroll"
      >
        {option}
      </Button>
    </>
  );
};

export default OptionCard;
