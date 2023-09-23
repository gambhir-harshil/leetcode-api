import { Document, Schema, model, models } from "mongoose";
import Model, { GenericObject } from "./model";

export interface ISubmission extends Document {
  username: string;
  easy_solved: number;
  medium_solved: number;
  hard_solved: number;
}

export const SubmissionSchema = new Schema<ISubmission>(
  {
    username: {
      type: String,
      required: true,
    },
    easy_solved: {
      type: Number,
      required: true,
    },
    medium_solved: {
      type: Number,
      required: true,
    },
    hard_solved: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default models?.Submission ||
  model<ISubmission>("Submission", SubmissionSchema);

export class SubmissionPayload extends Model {
  username: string;
  easy_solved: number;
  medium_solved: number;
  hard_solved: number;

  static schema = {
    username: {
      type: "string",
      required: true,
    },
    easy_solved: {
      type: "number",
      required: true,
    },
    medium_solved: {
      type: "number",
      required: true,
    },
    hard_solved: {
      type: "number",
      required: true,
    },
  };

  constructor(source: GenericObject) {
    super();

    this.username = "";
    this.easy_solved = 0;
    this.medium_solved = 0;
    this.hard_solved = 0;

    this.assign(source);
  }
}
