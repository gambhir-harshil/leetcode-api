import mongoose, { connect, disconnect } from "mongoose";
import { HTTP_STATUS_CODE, MONGODB_URI } from "@/lib/types/consts";
import CustomError from "@/lib/types/errors";

let cachedDb: typeof mongoose;

export const dbConnect = async () => {
  if (cachedDb) {
    console.log("db cache", cachedDb.STATES);
    return cachedDb;
  }
  try {
    const client = await connect(MONGODB_URI);
    console.log("db new");
    console.log("Mongodb Connection Established!", client.STATES);
    cachedDb = client;
    return client;
  } catch (error) {
    console.error("Error connecting to db");
    throw new MongodbConnectionError(error as Error);
  }
};

export const closeDbConnection = async () => {
  try {
    console.warn("Disconnecting Mongodb...");
    await disconnect();
  } catch (error) {
    console.error(error);
  }
};

class MongodbConnectionError extends CustomError {
  constructor(error: Error) {
    super(`Error connecting to MongoDB`, HTTP_STATUS_CODE.INTERNAL, error);
  }
}
