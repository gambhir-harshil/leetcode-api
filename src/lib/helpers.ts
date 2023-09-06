import { NextResponse } from "next/server";
import { ZodError } from "zod";

type EnvVariableKey = "JWT_SECRET_KEY" | "JWT_EXPIRES_IN";

export function getEnvVar(key: EnvVariableKey) {
  const value = process.env[key];
  if (!value || value.length < 1) {
    console.error(`Env variable ${key} not set`);
    throw new Error(`Env variable ${key} not set`);
  }
  return value;
}

export function getErrorRes(
  status: number = 500,
  message: string,
  errors: ZodError | null = null
) {
  return NextResponse.json(
    {
      status: status < 500 ? "fail" : "error",
      message,
      error: errors ? errors.flatten() : null,
    },
    { status }
  );
}
