import { feedbackSession } from "@/utils/AIModel";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  try {
    const result = await feedbackSession.sendMessage(prompt);
    if (result) {
      return NextResponse.json(JSON.parse(result.response.text()));
    }
    return { success: false, error: "Failed to generate feedback" };
  } catch (e) {
    console.log("Internal error: ", e);
    return {
      success: false,
      error: "Internal error occured while generating feedback",
    };
  }
}
