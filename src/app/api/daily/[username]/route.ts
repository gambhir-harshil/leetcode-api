import { type NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/clients/db";
import { errorResponseHandler } from "@/lib/helpers";
import type CustomError from "@/lib/types/errors";
import { HTTP_STATUS_CODE } from "@/lib/types/consts";
import { findDailyProgressByUsername } from "@/lib/services/dailyProgressService";

export async function GET(request: NextRequest, context: {
    params: {
        username: string
    }
}) {
    try {
        await dbConnect();

        const username: string  = context.params.username;
        const result = await findDailyProgressByUsername(username);

        return NextResponse.json(
            { msg: "success", result },
            { status: HTTP_STATUS_CODE.CREATED }
        );
    } catch (error: any | CustomError) {
        return errorResponseHandler(error);
    }
}
