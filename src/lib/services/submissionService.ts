import { HTTP_STATUS_CODE } from "../types/consts";
import CustomError from "../types/errors";
import Submission, { SubmissionPayload } from "../types/submissions";

const _getSubmissionById = (id: string) => Submission.findById(id);

export const findSubmissionById = async (id: string) => {
  const submission = await _getSubmissionById(id);

  if (!submission) throw new SubmissionNotFoundError(id);

  return submission;
};

export const createSubmission = async (payload: any) => {
  payload = new SubmissionPayload(payload);

  await Submission.validate(payload);

  return await Submission.create(payload);
};

export const updateSubmission = () => {};

export const deleteSubmission = () => {};

class SubmissionNotFoundError extends CustomError {
  constructor(id: string) {
    super(`Submission with id: ${id} not found`, HTTP_STATUS_CODE.NOT_FOUND);
  }
}
