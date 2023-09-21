import { z } from "zod";

export const SubmissionSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
    })
    .min(1, "Username is required"),
  easy_solved: z
    .number({
      required_error: "Number is required",
    })
    .min(0, "Positive number required"),
  medium_solved: z
    .number({
      required_error: "Number is required",
    })
    .min(0, "Positive number required"),
  hard_solved: z
    .number({
      required_error: "Number is required",
    })
    .min(0, "Positive number required"),
});

export type SubmissionSchema = z.infer<typeof SubmissionSchema>;
