import { z } from "zod";

const schemea = z.object({
  name: z.string().min(3).max(100),
  email: z.string().email(),
  password: z.string().min(8).max(100),
});

export default schemea;
