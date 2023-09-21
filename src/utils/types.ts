import { Document } from "mongoose";

export interface ResponseFuncs {
  GET?: Function;
  POST?: Function;
  PUT?: Function;
  DELETE?: Function;
}

export interface IUser extends Document {
  username: string;
  password: string;
  email: string;
}

export interface ISubmissions extends Document {
    username: string;
    easy_solved: number;
    medium_solved: number;
    hard_solved: number;
}
