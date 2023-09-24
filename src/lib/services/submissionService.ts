import { HTTP_STATUS_CODE } from "../types/consts";
import CustomError from "../types/errors";
import Submission, { SubmissionPayload } from "../types/submissions";

const _getSubmissionByUsername = (query: any) => Submission.find(query);

const _checkSubmissionByUsername = (query: any) => Submission.findOne(query);

export const findSubmissionByUsername = async (username: string) => {

    const query = { username: username }
    const submission = await _getSubmissionByUsername(query);

    if (!submission) throw new SubmissionNotFoundError(username);

    return submission;
};

export const createUserScore = async (payload: any) => {
    let score: number = payload.easy_solved * 0.3 + payload.medium_solved * 0.6 + payload.hard_solved * 1;
    return score;
}

export const createSubmission = async (payload: any) => {
    try {
        payload = new SubmissionPayload(payload);

        await Submission.validate(payload);

        const existingSubmission = await _checkSubmissionByUsername({ username: payload.username });

        if (existingSubmission) {
            throw new SubmissionExistsError(payload.username);
        }

        return await Submission.create(payload);
    } catch (error: any | CustomError) {
        throw error;
    }
};

export const updateSubmission = async (payload: any) => {
    payload = new SubmissionPayload(payload);

    await Submission.validate(payload);

    const conditions = {
        username: payload.username
    }

    //needs to be false to calculate the difference
    const options = { new: false }

    return await Submission.findOneAndUpdate(conditions, payload, options)
};

export const deleteSubmission = () => { };

class SubmissionExistsError extends CustomError {
    constructor(username: string) {
        super(`Submission with username: ${username} already exists.`, HTTP_STATUS_CODE.CONFLICT);
    }
}
class SubmissionNotFoundError extends CustomError {
    constructor(username: string) {
        super(`Submission with username: ${username} not found`, HTTP_STATUS_CODE.NOT_FOUND);
    }
}
