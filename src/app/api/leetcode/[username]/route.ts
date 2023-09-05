import { NextResponse } from "next/server";
import { LEETCODE_GRAPHQL_URL } from "@/utils/consts";

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
    console.log(request.method)
    const response = await fetch(LEETCODE_GRAPHQL_URL, opts);
    const resp = await response.json();
    return NextResponse.json({ resp }, { status: 200 });
  } catch (error) {
    console.error("Error getting leetcode data: ", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
