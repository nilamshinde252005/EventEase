// Zod is a validation library.
// use it so backend never receives invalid, missing, or wrong typed data.
import { z } from "zod";

export const createEventSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    date: z.string().optional(),
    time: z.string().optional(),
    venue: z.string().min(1, "Venue is required"),
    capacity: z.number().min(1, "Capacity must be at least 1"),
    posterUrl: z.string().optional(),
})

export const updateEventSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  date: z.string().optional(),
  time: z.string().optional(),
  venue: z.string().optional(),
  capacity: z.number().optional(),
  posterUrl: z.string().optional(),
});