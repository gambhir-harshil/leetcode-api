import { HTTP_STATUS_CODE } from "../types/consts";
import CustomError from "../types/errors";
import DailyProgress, { DailyProgressPayload } from "../types/daily";

const _getDailyProgressById = (id: string) => DailyProgress.findById(id);

export const findDailyProgressById = async (id: string) => {
    const dailyProgress = await _getDailyProgressById(id);

    if (!dailyProgress) throw new DailyProgressNotFoundError(id);

    return dailyProgress;
};

export const createOrUpdateDailyProgress = async (payload: any) => {
    payload = new DailyProgressPayload(payload);

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0

    const query = {
        username: payload.username,
        createdAt: {
            $gte: today, // Documents created today or later
            $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) // Documents created before tomorrow
        }
    };

    const options = {
        upsert: true, // Creates a new document if it doesn't exist
        new: true,   // Returns the modified document
        setDefaultsOnInsert: true  // Sets default values if creating a new document
    };

    try {
        await DailyProgress.validate(payload);
        return await DailyProgress.findOneAndUpdate(query, {
            $inc: {
                easy_solved: payload.easy_solved,
                medium_solved: payload.medium_solved,
                hard_solved: payload.hard_solved,
            }
        }, options); // $inc is to increment each field, i am hoping this works


    } catch (error) {
        throw new Error((error as Error).message);
    }
};

export const deleteDailyProgress = () => { };

class DailyProgressNotFoundError extends CustomError {
    constructor(id: string) {
        super(`DailyProgress with id: ${id} not found`, HTTP_STATUS_CODE.NOT_FOUND);
    }
}
