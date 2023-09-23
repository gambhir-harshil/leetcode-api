import { type NextRequest, NextResponse } from "next/server";
import { errorResponseHandler } from "@/lib/helpers";
import CustomError from "@/lib/types/errors";
import { fetchLeetcodeData } from "@/lib/clients/leetcode";

// this should a protected route
// passport to be passed from middlware
export async function GET(
  request: NextRequest,
  context: { params: { username: string } }
) {
  try {
    const leetcodeData = await fetchLeetcodeData(context.params.username);
    return NextResponse.json({ leetcodeData }, { status: 200 });
  } catch (error) {
    return errorResponseHandler(error as CustomError);
  }
}
