import client from "./client";

// students 
export async function registerForEventApi(eventId) {
  const res = await client.post("/registrations", { eventId });
  return res.data;
}

export async function getMyRegistrationsApi() {
  const res = await client.get("/registrations/my");
  return res.data;
}

export async function cancelRegistrationApi(id) {
  const res = await client.delete(`/registrations/${id}`);
  return res.data;
}

// admin
export async function getRegistrationsByEventApi(eventId) {
  const res = await client.get(`/registrations/event/${eventId}`);
  return res.data;
}