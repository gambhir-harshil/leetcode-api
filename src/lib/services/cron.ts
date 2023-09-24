import { getAllUsers } from "./userService";
import { fetchLeetcodeData } from "@/lib/clients/leetcode";
import { errorResponseHandler } from "@/lib/helpers";
import { updateSubmission, createUserScore} from "@/lib/services/submissionService";
import { createOrUpdateDailyProgress } from "@/lib/services/dailyProgressService";
import type CustomError from "@/lib/types/errors";


// need to think about when a user exists in db but no submission document, shouldn't ever happen'
export const updateSubmissionsCron = async () => {

    const users = await getAllUsers();

    try {
        // essentially do the submissions PATCH logic on all users
        for (const user of users) {
            const leetcodeData: any = await fetchLeetcodeData(user.username);

            // console.log("cron username: " + user.username)
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

            const resp = await createOrUpdateDailyProgress(difference);
            console.log(resp);
        }
        return "All users have been updated.";
    } catch (error: any | CustomError) {
        return errorResponseHandler(error);
    }
}
