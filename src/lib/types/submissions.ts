import { Document, Schema, model, models } from "mongoose";
import Model, { GenericObject } from "./model";

export interface ISubmission extends Document {
  username: string;
  easy_solved: number;
  easy_submitted: number;
  medium_solved: number;
  medium_submitted: number;
  hard_solved: number;
  hard_submitted: number;
  total_solved: number;
  total_submitted: number;
  score: number;
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
    easy_submitted: {
      type: Number,
      required: true,
    },
    medium_solved: {
      type: Number,
      required: true,
    },
    medium_submitted: {
      type: Number,
      required: true,
    },
    hard_solved: {
      type: Number,
      required: true,
    },
    hard_submitted: {
      type: Number,
      required: true,
    },
    total_solved: {
      type: Number,
      required: true,
    },
    total_submitted: {
      type: Number,
      required: true,
    },
    score: {
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
  easy_submitted: number;
  medium_solved: number;
  medium_submitted: number;
  hard_solved: number;
  hard_submitted: number;
  total_solved: number;
  total_submitted: number;
  score: number;

  static schema = {
    username: {
      type: "string",
      required: true,
    },
    easy_solved: {
      type: "number",
      required: true,
    },
    easy_submitted: {
      type: "number",
      required: true,
    },
    medium_solved: {
      type: "number",
      required: true,
    },
    medium_submitted: {
      type: "number",
      required: true,
    },
    hard_solved: {
      type: "number",
      required: true,
    },
    hard_submitted: {
      type: "number",
      required: true,
    },
    total_solved: {
      type: "number",
      required: true,
    },
    total_submitted: {
      type: "number",
      required: true,
    },
    score: {
      type: "number",
      required: true,
    },
  };

  constructor(source: GenericObject) {
    super();

    this.username = "";
    this.easy_solved = 0;
    this.easy_submitted = 0;
    this.medium_solved = 0;
    this.medium_submitted = 0;
    this.hard_solved = 0;
    this.hard_submitted = 0;
    this.total_solved = 0;
    this.total_submitted = 0;
    this.score = 0;

    this.assign(source);
  }
}
