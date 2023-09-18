import { HTTP_STATUS_CODE } from "./consts";

export default class CustomError extends Error {
  timestamp: Date;
  status: number;
  innerError: Error;

  constructor(message: string, status: number, innerError?: any) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);

    /**
     * Ensure the name of this error is the same as the class name
     * @type {string}
     */
    this.name = this.constructor.name;

    /**
     * Error datetime
     * @type {Date}
     */
    this.timestamp = new Date();

    /**
     * Error status code
     * @type {number}
     */
    this.status = status ? status : HTTP_STATUS_CODE.INTERNAL;

    /**
     * Error that started the chain
     * @type {Error}
     */
    this.innerError = innerError ? innerError : null;

    /**
     * Error stack trace
     */
    this.stack = innerError ? innerError.stack : null;

    // This clips the constructor invocation from the stack trace.
    // It's not absolutely essential, but it does make the stack trace a little nicer.
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends CustomError {
  constructor(error: Error) {
    super(error.message, HTTP_STATUS_CODE.BAD_REQUEST, error);
  }
}
