import { z } from "zod";

// export const newIssueSchema = z.object({
//   title: z.string().min(1).max(100),
//   description: z.string().min(1).max(65000),
// });

export const newIssueSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  description: z.string().min(1).max(65000).optional(),
  status: z.enum(["OPEN", "IN_PROGRESS", "DONE"]).optional(),
  assignedToUserId: z.string().min(1).max(255).optional().nullable(),
});
