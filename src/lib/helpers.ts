import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { HTTP_STATUS_CODE } from "@/lib/types/consts";
import type CustomError from "@/lib/types/errors";

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

export function errorResponseHandler(error: CustomError) {
  console.error(error.stack);
  return NextResponse.json(
    { error, message: error?.message || "Something went wrong" },
    { status: error?.status || HTTP_STATUS_CODE.INTERNAL }
  );
}

export async function httpFetch(route: string, method: string, data: any) {
  const response = await fetch(route, {
    headers: { "content-type": "application/json" },
    method,
    body: JSON.stringify(data),
  });

  const res = await response.json();

  if (!response.ok) {
    throw new Error(res.message);
  }

  return res;
}
