import { type NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/clients/db";
import { fetchLeetcodeData } from "@/lib/clients/leetcode";
import { errorResponseHandler } from "@/lib/helpers";
import type CustomError from "@/lib/types/errors";
import { createSubmission, createUserScore, updateSubmission } from "@/lib/services/submissionService";
import { HTTP_STATUS_CODE } from "@/lib/types/consts";
import { createOrUpdateDailyProgress } from "@/lib/services/dailyProgressService";

// this should a protected route
// passport to be passed from middlware
export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const { username } = await request.json();
        const leetcodeData: any = await fetchLeetcodeData(username);

        const leetcodeScore: number = await createUserScore(leetcodeData);

        const payload = {
            username: leetcodeData.username,
            easy_solved: leetcodeData.easy_solved,
            easy_submitted: leetcodeData.easy_submitted,
            medium_solved: leetcodeData.medium_solved,
            medium_submitted: leetcodeData.medium_submitted,
            hard_solved: leetcodeData.hard_solved,
            hard_submitted: leetcodeData.hard_submitted,
            total_solved: leetcodeData.total_solved,
            total_submitted: leetcodeData.total_submitted,
            score: leetcodeScore,
        };

        console.log(payload)

        const submission = await createSubmission(payload);

        return NextResponse.json(
            { msg: "success", submission },
            { status: HTTP_STATUS_CODE.CREATED }
        );
    } catch (error: any | CustomError) {
        return errorResponseHandler(error as CustomError);
    }
}

export async function PATCH(request: NextRequest) {
    try {
        await dbConnect();
        const { username } = await request.json();
        const leetcodeData: any = await fetchLeetcodeData(username);

        const leetcodeScore: number = await createUserScore(leetcodeData);

        const payload = {
            username: leetcodeData.username,
            easy_solved: leetcodeData.easy_solved,
            easy_submitted: leetcodeData.easy_submitted,
            medium_solved: leetcodeData.medium_solved,
            medium_submitted: leetcodeData.medium_submitted,
            hard_solved: leetcodeData.hard_solved,
            hard_submitted: leetcodeData.hard_submitted,
            total_solved: leetcodeData.total_solved,
            total_submitted: leetcodeData.total_submitted,
            score: leetcodeScore,
        };

        // the response returns the old table, allowing us to calculate the difference
        const submission = await updateSubmission(payload);

        const difference = {
            username: leetcodeData.username,
            easy_solved: payload.easy_solved - submission.easy_solved,
            easy_submitted: payload.easy_submitted - submission.easy_submitted,
            medium_solved: payload.medium_solved - submission.medium_solved,
            medium_submitted: payload.medium_submitted - submission.medium_submitted,
            hard_solved: payload.hard_solved - submission.hard_solved,
            hard_submitted: payload.hard_submitted - submission.hard_submitted,
            total_solved: payload.total_solved - submission.total_solved,
            total_submitted: payload.total_submitted - submission.total_submitted,
            score: payload.score - submission.score,
        }

        const dailyProgress = await createOrUpdateDailyProgress(difference);

        return NextResponse.json(
            { msg: "success", submission, dailyProgress },
            { status: HTTP_STATUS_CODE.CREATED }
        );
    } catch (error: any | CustomError) {
        return errorResponseHandler(error);
    }
}
