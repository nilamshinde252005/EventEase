import client from "./client";

// PUBLIC / STUDENT
export async function getEventsApi() {
    const res = await client.get("/events");
    return res.data;
}

export async function getEventApi(id){
    const res = await client.get(`/events/${id}`)
     return res.data;
}

export async function getEventStatsApi(id) {
  const res = await client.get(`/events/${id}/stats`);
  return res.data; // { success, data: { sold, capacity, remaining, percentage } }
}

// ADMIN ONLY (but same endpoints, just used from AdminRoute pages)
export async function createEventApi(data) {
    const res = await client.post("/events",data)
    return res.data
}

export async function updateEventApi(id, data) {
  const res = await client.put(`/events/${id}`, data);
  return res.data;
}

export async function deleteEventApi(id) {
  const res = await client.delete(`/events/${id}`);
  return res.data;
}