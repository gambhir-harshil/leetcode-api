import { type NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/clients/db";
import { fetchLeetcodeData } from "@/lib/clients/leetcode";
import { errorResponseHandler } from "@/lib/helpers";
import type CustomError from "@/lib/types/errors";
import { createSubmission } from "@/lib/services/submissionService";
import { HTTP_STATUS_CODE } from "@/lib/types/consts";

// this should a protected route
// passport to be passed from middlware
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { username } = await request.json();
    const leetcodeData: any = await fetchLeetcodeData(username);

    const payload = {
      username: leetcodeData.username,
      easy_solved: leetcodeData.easy,
      medium_solved: leetcodeData.medium,
      hard_solved: leetcodeData.hard,
    };

    const submission = await createSubmission(payload);

    return NextResponse.json(
      { msg: "success", submission },
      { status: HTTP_STATUS_CODE.CREATED }
    );
  } catch (error: any | CustomError) {
    return errorResponseHandler(error);
  }
}
