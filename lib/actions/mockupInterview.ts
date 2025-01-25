"use server";

import { db } from "@/database/drizzle";
import { interviews, users } from "@/database/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq, sql } from "drizzle-orm";

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
  const user = await currentUser();
  if (!user) return { success: false, error: "Unauthenticated" };
  try {
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

//  interviewId: varchar("interviewId").notNull().unique(),
//   userId: uuid("userId")
//     .references(() => users.id)
//     .notNull(),
//   createdBy: varchar("createdBy"),
//   jobTitle: varchar("jobTitle"),
//   industry: varchar("industry"),
//   jobDescription: text("jobDescription"),
//   skills: text("skills"),
//   experienceLevel: varchar("experienceLevel"),
//   keyCompetencies: text("keyCompetencies"),
//   education: varchar("education"),
//   interviewData: jsonb("interviewData"),
//   createdAt: varchar("createdAt"),
