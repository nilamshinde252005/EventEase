import { z } from "zod";

export const createRegistrationSchema = z.object({
  eventId: z.number({
    required_error: "eventId is required",
    invalid_type_error: "eventId must be a number",
  }),
});

export const cancelRegistrationSchema = z.object({
  id: z.number({
    required_error: "Registration id is required",
    invalid_type_error: "Registration id must be a number",
  }),
});
