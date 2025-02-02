"use server";

import { db } from "@/database/drizzle";
import { getCurrentUser } from "./users";
import { answers } from "@/database/schema";
import { and, desc, eq } from "drizzle-orm";

export const saveAnswerToDb = async (
  answerId: string,
  interviewId: string,
  userId: string,
  createdBy: string,
  question: string,
  correctAnswer: string,
  userAnswer: string,
  feedback: string,
  rating: string,
  createdAt: string
) => {
  try {
    const user = await getCurrentUser();
    if (!user.success) return { success: false, error: "Unauthenticated" };

    const data = await db
      .insert(answers)
      .values({
        answerId: answerId,
        interviewId: interviewId,
        userId: userId,
        createdBy: createdBy,
        question: question,
        correctAnswer: correctAnswer,
        userAnswer: userAnswer,
        feedback: feedback,
        rating: rating,
        createdAt: createdAt,
      })
      .returning();

    if (data) {
      return { success: true, data: data };
    }
    return { success: false, error: "Failed to save user answers" };
  } catch (error) {
    console.log("Save interview answers error: ", error);
    return {
      success: false,
      error: "An error occurred while saving user answers",
    };
  }
};

export const getUserAnswersByInterviewId = async (
  interviewId: string,
  userEmail: string
) => {
  try {
    const user = await getCurrentUser();
    if (!user.success) return { success: false, error: "Unauthenticated" };

    const data = await db
      .select()
      .from(answers)
      .where(
        and(
          eq(answers.interviewId, interviewId),
          eq(answers.createdBy, userEmail)
        )
      )
      .orderBy(desc(answers.createdAt));
    if (data.length > 0) {
      return { success: true, data: data };
    }
    return { success: false, error: "Failed to fetch answers by interview id" };
  } catch (error) {
    console.log("Failed to fetch answers by interview id log: ", error);
    return {
      success: false,
      error: "Internal error occured while fetching answers from interview id",
    };
  }
};
