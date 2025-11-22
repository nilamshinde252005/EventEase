import { events } from "../../db/schema.js";// It knows about the columns: id, title, date,
import { eq } from "drizzle-orm"; // a helper function from Drizzle to build WHERE conditions.
import { db } from "../../db/index.js";// database connection (Drizzle client).


// values(data) - each object key → the corresponding column in the table
export async function createEvent(data) {
    const inserted = await db //db.insert(events) -> “Insert into the events table.”
    .insert(events)
    .values(data)
    .returning();

    return inserted[0]; // gives just one row 
}

export async function getAllEvents(){
    const result = await db.select().from(events);
    return result; // give the whole list back
}

// eventId coming from URL params /events/:id ,i.e the id i want to find
// events.id = database COLUMN
// eventId = input VALUE
export async function getEventById(eventId) {
  const result = await db
    .select()
    .from(events)
    .where(eq(events.id, eventId));

  return result[0] || null;
}

export async function updateEvent(eventId,data) {
    const updated = await db
    .update(events)
    .set(data)
    .where(eq(events.id,eventId))
    .returning();

    return updated[0] || null;
}

export async function deleteEvent(eventId) {
  const deleted = await db
    .delete(events)
    .where(eq(events.id, eventId))
    .returning();

  return deleted[0] || null;
}

