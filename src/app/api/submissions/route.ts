import { NextRequest, NextResponse } from "next/server";
import { SubmissionSchema } from "@/lib/types/submissions";
import { dbConnect } from "@/lib/clients/db";
import Submission, { ISubmissions, SubmissionRO } from "@/lib/types/submissions";
import { ZodError } from "zod";
import { getErrorRes } from "@/lib/helpers";
import { LEETCODE_GRAPHQL_URL, API_ROUTES } from "@/lib/types/consts";

export async function POST(req: NextRequest, res: NextResponse) {
    console.log("POST submissions");
    try {
        const body = await req.json();
        let username: string = body.username;
        console.log(body);

        const newData = await getLeetcode(username);

        // could be my problem here, the newData variablle isn't finished yet
        if (!newData) {
            return getErrorRes(500, "Failed to fetch Leetcode data");
        }

        const conn  = await dbConnect();
        const newSubmission = Submission.create({
            username: newData.data.matchedUser.username,
            easy_solved: newData.data.matchedUser.submitStats.acSubmissionNum[1].count,
            medium_solved: newData.data.matchedUser.submitStats.acSubmissionNum[2].count,
            hard_solved: newData.data.matchedUser.submitStats.acSubmissionNum[3].count,
        });


        await conn;
        // const submission = await newSubmission.save();
        // console.log(submission);

        return NextResponse.json(
            // { msg: "success", username: username, submission_id: submission._id },
            { status: 201 }
        );

    } catch (err: any) {
        if (err instanceof ZodError) {
            return getErrorRes(400, "Validations failed", err);
        }
        if (err.code === "P2002") { // figure this out
            return getErrorRes(409, "lasifasfhdsafadsf?");
        }
        return getErrorRes(500, err.message);
    }
}


export async function getLeetcode(username: string) {

    const opts = {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
            query: `
              { matchedUser(username: "${username}") {
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
              }
            }`,
        }),
    };

    const response = await fetch(`${LEETCODE_GRAPHQL_URL}/${username}`, opts);
    const newData = await response.json();

    return newData;

}

