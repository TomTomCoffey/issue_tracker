import { z } from "zod";

export const newIssueSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1),
});
