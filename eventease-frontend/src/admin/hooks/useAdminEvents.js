// src/admin/hooks/useAdminEvents.js
import { useEffect, useState } from "react";
import {
    getEventsApi,
    getEventApi,
    createEventApi,
    updateEventApi,
    deleteEventApi,
} from "../../api/eventsApi";

// hook wraps getEventsApi() and deleteEventApi()
export function useAdminEventsList() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // helper function.
    async function load() {
        setLoading(true);
        setError("");
        try {
            const data = await getEventsApi();
            if (!data.success) throw new Error(data.message || "Failed to load events");
            setEvents(data.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, []);

    // helper function.
    async function deleteEvent(id) {
        setError("");
        try {
            const data = await deleteEventApi(id);
            if (!data.success) throw new Error(data.message || "Failed to delete");
            await load();
        } catch (err) {
            setError(err.message);
        }
    }

    return { events, loading, error, reload: load, deleteEvent };
}

// React hook, but this one is for one event, e.g. the Edit Event page
export function useAdminSingleEvent(id) {
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function load() {
            setLoading(true);
            setError("");
            try {
                const data = await getEventApi(id);
                if (!data.success) throw new Error(data.message || "Failed to load event");
                setEvent(data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        if (id) load();
    }, [id]);

    return { event, loading, error, setEvent };
}

// helper function - calls createEventApi(data) = Example use in AdminCreateEventPage.jsx
export async function adminCreateEvent(data) {
    const res = await createEventApi(data);
    if (!res.success) throw new Error(res.message || "Failed to create event");
    return res.data;
}

// helper function - Calls updateEventApi(id, data) = Used in AdminEditEventPage.jsx
export async function adminUpdateEvent(id, data) {
    const res = await updateEventApi(id, data);
    if (!res.success) throw new Error(res.message || "Failed to update event");
    return res.data;
}
