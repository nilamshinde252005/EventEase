// Frontend API helper file- organise all authentication-related API calls in one place

// authApi.js talks to the backend by calling /auth/login and /auth/register.
// The backend receives those requests in routes.js, passes them to controller.js, which then calls service.js

// authApi.js = talks to the backend.
// AuthContext.jsx = stores authentication state in the frontend.

import client from "./client";

export async function loginApi({ email, password }) // {email,password} - the ones we passed in controller req.body
{
    const res = await client.post("/auth/login", { email, password });
    return res.data;
}

export async function registerApi({ name, email, password }) {
    const res = await client.post("/auth/register", { name, email, password });
    return res.data
} 