import { NextResponse } from "next/server";
import { LEETCODE_GRAPHQL_URL } from "@/utils/consts";

export async function GET(
  request: Request,
  context: { params: { username: string } }
) {
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
          }
        }
      }`,
    }),
  };
  const response = await fetch(LEETCODE_GRAPHQL_URL, opts);
  const resp = await response.json();
  return NextResponse.json({ data: resp }, { status: 200 });
}
