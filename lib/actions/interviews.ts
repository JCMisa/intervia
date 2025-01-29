"use server";

import { db } from "@/database/drizzle";
import { interviews, users } from "@/database/schema";
import { desc, eq, sql } from "drizzle-orm";
import { getCurrentUser } from "./users";
import moment from "moment";

export const saveInterview = async (
  interviewId: string,
  userId: string,
  createdBy: string,
  jobTitle: string,
  industry: string,
  jobDescription: string,
  skills: string,
  experienceLevel: string,
  keyCompetencies: string,
  education: string,
  interviewData: InterviewData,
  createdAt: string
) => {
  try {
    const user = await getCurrentUser();
    if (!user.success) return { success: false, error: "Unauthenticated" };

    const data = await db
      .insert(interviews)
      .values({
        interviewId: interviewId,
        userId: userId,
        createdBy: createdBy,
        jobTitle: jobTitle,
        industry: industry,
        jobDescription: jobDescription,
        skills: skills,
        experienceLevel: experienceLevel,
        keyCompetencies: keyCompetencies,
        education: education,
        interviewData: interviewData,
        createdAt: createdAt,
      })
      .returning();

    if (data) {
      const updateUserCredits = await db
        .update(users)
        .set({
          credits: sql`${users.credits} + 1`,
        })
        .where(eq(users.id, userId))
        .returning();

      if (updateUserCredits) {
        return { success: true, data: data };
      }
      return { success: false, error: "Failed to update user credits" };
    }
    return { success: false, error: "Failed to save interview data" };
  } catch (error) {
    console.log("Save interview data error: ", error);
    return {
      success: false,
      error: "An error occurred while saving the interview",
    };
  }
};

export async function getAllInterviews() {
  try {
    const data = await db
      .select()
      .from(interviews)
      .orderBy(desc(interviews.createdAt));

    return { success: true, data: data };
  } catch (error) {
    console.error("Failed to fetch interviews:", error);
    return {
      success: false,
      error: "Internal error while fetching interviews",
    };
  }
}

export const getUserInterviews = async () => {
  try {
    const user = await getCurrentUser();
    if (!user.success) return { success: false, error: "Unauthenticated" };

    const data = await db
      .select()
      .from(interviews)
      .where(eq(interviews.userId, user.data?.id as string));
    if (data.length > 0)
      return { success: true, data: data, total: data.length };
    return { success: false, error: "No interviews found for this user" };
  } catch (error) {
    console.log("Get user interviews error: ", error);
    return {
      success: false,
      error: "An error occurred while fetching user interviews",
    };
  }
};

export const getInterviewByInterviewId = async (interviewId: string) => {
  try {
    const user = await getCurrentUser();
    if (!user.success) return { success: false, error: "Unauthenticated" };

    const data = await db
      .select()
      .from(interviews)
      .where(eq(interviews.interviewId, interviewId));
    if (data.length > 0) return { success: true, data: data[0] };
    return { success: false, error: "No interview found with this id" };
  } catch (error) {
    console.log("Get interview by interviewId error: ", error);
    return {
      success: false,
      error: "An error occurred while fetching interview",
    };
  }
};

export const getUserTotalInterviewsThisMonth = async () => {
  try {
    const user = await getCurrentUser();
    if (!user.success) return { success: false, error: "Unauthenticated" };

    const userInterviews = await db
      .select()
      .from(interviews)
      .where(eq(interviews.userId, user.data?.id as string));

    const currentMonth = moment().format("MM");
    // const nextMonth = moment().add(1, "months").format("MM");

    const currentMonthRecords = userInterviews.filter(
      (record) =>
        moment(record.createdAt, "MM-DD-YYYY").format("MM") === currentMonth
    );

    if (currentMonthRecords.length > 0)
      return {
        success: true,
        data: currentMonthRecords,
        total: currentMonthRecords.length,
      };
    return { success: false, error: "No interviews in this current month" };
  } catch (error) {
    console.log("Get user interviews for this month error: ", error);
    return {
      success: false,
      error: "An error occurred while fetching user interviews for this month",
    };
  }
};

export const getUserMostUsedIndustry = async () => {
  try {
    const user = await getCurrentUser();
    if (!user.success) return { success: false, error: "Unauthenticated" };

    const mostUsedIndustry = await db
      .select({
        industry: interviews.industry,
        count: sql<number>`COUNT(*)`.as("count"),
      })
      .from(interviews)
      .where(eq(interviews.userId, user.data?.id as string))
      .groupBy(interviews.industry)
      .orderBy(desc(sql`count`))
      .limit(1);

    if (mostUsedIndustry.length > 0) {
      return {
        success: true,
        data: mostUsedIndustry[0].industry,
        total: mostUsedIndustry[0].count,
      };
    }
    return { success: false, error: "User does not have most used industry" };
  } catch (error) {
    console.log("Get user most used industry error: ", error);
    return {
      success: false,
      error: "An error occurred while fetching user most used industry",
    };
  }
};
