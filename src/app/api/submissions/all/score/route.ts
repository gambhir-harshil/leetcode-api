import { type NextRequest, NextResponse } from "next/server";
import { errorResponseHandler } from "@/lib/helpers";
import CustomError from "@/lib/types/errors";
import { getAllSubmissionByScore } from "@/lib/services/submissionService";

export async function GET(request: NextRequest) {
    console.log("here!")
    try {
        const responseData = await getAllSubmissionByScore();
        return NextResponse.json({ responseData }, { status: 200 });
    } catch (error) {
        return errorResponseHandler(error as CustomError);
    }
}
