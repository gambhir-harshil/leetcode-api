import { type NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/clients/db";
import { errorResponseHandler } from "@/lib/helpers";
import type CustomError from "@/lib/types/errors";
import { HTTP_STATUS_CODE } from "@/lib/types/consts";
import { updateSubmissionsCron } from "@/lib/services/cron";

// this should a protected route
// passport to be passed from middlware
export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const result = await updateSubmissionsCron();

        return NextResponse.json(
            { msg: "success", result },
            { status: HTTP_STATUS_CODE.CREATED }
        );
    } catch (error: any | CustomError) {
        return errorResponseHandler(error);
    }
}
