"use server";

import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import moment from "moment";
import { headers } from "next/headers";
import ratelimit from "../ratelimit";
import { redirect } from "next/navigation";

export const syncUser = async () => {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) return { success: false, error: "No user found" };

  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);
  if (!success) return redirect("/too-fast");

  try {
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.userId, userId));

    if (existingUser.length > 0)
      return { success: false, error: "User already exists" };

    const result = await db
      .insert(users)
      .values({
        userId: userId,
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        email: user.emailAddresses[0].emailAddress ?? "",
        imageUrl: user.imageUrl,
        role: "USER",
        createdAt: moment().format("MM-DD-YYYY"),
      })
      .returning();

    if (result) return { success: false, data: result };

    return { success: false, error: "Error inserting a user" };
  } catch (error) {
    console.log("Signin error: ", error);
    return { success: false, error: "An error occurred while signing in" };
  }
};

export const getCurrentUser = async () => {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) return { success: false, error: "No user found" };

  try {
    const data = await db.select().from(users).where(eq(users.userId, userId));

    if (data.length > 0) return { success: true, data: data[0] };

    return { success: false, error: `User with id ${userId} does not found.` };
  } catch (error) {
    console.log("Get current user error: ", error);
    return { success: false, error: "An error occurred while getting a user" };
  }
};
