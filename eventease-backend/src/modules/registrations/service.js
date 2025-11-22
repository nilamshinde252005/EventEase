import { eq, and, sql } from "drizzle-orm";
import { events, registrations } from "../../db/schema.js";// It knows about the columns: id, title, date,
import { db } from "../../db/index.js";// database connection (Drizzle client).

export async function createRegistration(userId, eventId) {
  // 1) check event exists
  const [event] = await db
    .select()
    .from(events)
    .where(eq(events.id, eventId));

  if (!event) {
    throw new Error("Event not found");
  }

  // 2) count current registrations for this event
  const [row] = await db
    .select({
      count: sql`cast(count(*) as int)`,
    })
    .from(registrations)
    .where(eq(registrations.eventId, eventId)); 

  const currentCount = row?.count ?? 0;

  // (optional) capacity check
  if (event.capacity != null && currentCount >= event.capacity) {
    throw new Error("Event is full");
  }

  // 3) insert new registration
  const [created] = await db
    .insert(registrations)
    .values({
      userId,
      eventId,
      status: "REGISTERED",
    })
    .returning();

  return created; 
}

export async function getAllRegistrations() {
  const rows = await db
    .select() 
    .from(registrations);

  return rows;
}

export async function getRegistrationsByUser(userId) {
  const rows = await db
    .select()
    .from(registrations)
    .where(eq(registrations.userId, userId));

  return rows;
}

export async function getRegistrationsByEvent(eventId) {
  const rows = await db
    .select()
    .from(registrations)
    .where(eq(registrations.eventId, eventId));

  return rows;
}

export async function cancelRegistration(registrationId, userId) {
  const [deleted] = await db
    .delete(registrations)
    .where(
      and(
        eq(registrations.id, registrationId),   
        eq(registrations.userId, userId)
      )
    )
    .returning();

  return deleted;
}

export async function countTicketsForEvent(eventId) {
  const [row] = await db
    .select({
      count: sql`COUNT(*)`.mapWith(Number),
    })
    .from(registrations)
    .where(eq(registrations.eventId, eventId));

  return row?.count || 0;
}