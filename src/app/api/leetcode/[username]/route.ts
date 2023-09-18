import { NextResponse } from "next/server";
import { LEETCODE_GRAPHQL_URL } from "@/types/consts";
import { errorResponseHandler } from "@/lib/helpers";
import CustomError from "@/types/errors";

export async function GET(
  request: Request,
  context: { params: { username: string } }
) {
  try {
    const opts = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        query: `
              { matchedUser(username: "${context.params.username}") {
                username
                submitStats: submitStatsGlobal {
                  acSubmissionNum {
                    difficulty
                    count
                    submissions
                  }

                  totalSubmissionNum {
                    difficulty
                    count
                    submissions
                  }
                }
                submissionCalendar
                profile { reputation ranking }
              }
            }`,
      }),
    };
    const response = await fetch(LEETCODE_GRAPHQL_URL, opts);
    const resp = await response.json();
    return NextResponse.json({ resp }, { status: 200 });
  } catch (error) {
    return errorResponseHandler(error as CustomError);
  }
}
