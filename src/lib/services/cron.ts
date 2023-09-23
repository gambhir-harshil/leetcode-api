import { getAllUsers } from "./userService";
import { fetchLeetcodeData } from "@/lib/clients/leetcode";
import { errorResponseHandler } from "@/lib/helpers";
import { updateSubmission } from "@/lib/services/submissionService";
import { createOrUpdateDailyProgress } from "@/lib/services/dailyProgressService";
import type CustomError from "@/lib/types/errors";

export const updateSubmissionsCron = async () => {

    const users = await getAllUsers();

    try {
        // essentially do the submissions PATCH logic on all users
        for (const user of users) {
            const leetcodeData: any = await fetchLeetcodeData(user.username);
            
            // console.log("cron username: " + user.username)
            
            const payload = {
                username: user.username,
                easy_solved: leetcodeData.easy,
                medium_solved: leetcodeData.medium,
                hard_solved: leetcodeData.hard,
            };

            const submission = await updateSubmission(payload);

            const difference = {
                username: user.username,
                easy_solved: payload.easy_solved - submission.easy_solved,
                medium_solved: payload.medium_solved - submission.medium_solved,
                hard_solved: payload.hard_solved - submission.hard_solved,
            }

            const resp = await createOrUpdateDailyProgress(difference);
            console.log(resp);
        }
        // return "All users have been updated.";
    } catch (error: any | CustomError) {
        return errorResponseHandler(error);
    }
}
