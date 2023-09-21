import { Document, Schema, model, models } from "mongoose";

export interface ISubmissions extends Document {
    username: string;
    easy_solved: number;
    medium_solved: number;
    hard_solved: number;
}

export const SubmissionSchema = new Schema<ISubmissions>(
    {
        username: {
            type: String,
            required: true,
        },
        easy_solved: {
            type: Number,
            required: true
        },
        medium_solved: {
            type: Number,
            required: true,
        },
        hard_solved: {
            type: Number,
            required: true,
        }
    },
    { timestamps: true }
);

export default models?.Submission || model<ISubmissions>("Submission", SubmissionSchema);

export class SubmissionRO {
  username: string;
  easy_solved: number;
  medium_solved: number;
  hard_solved: number;

  constructor(source: ISubmissions) {
    this.username = source.username;
    this.easy_solved = source.easy_solved;
    this.medium_solved = source.medium_solved;
    this.hard_solved = source.hard_solved;
  }
}
