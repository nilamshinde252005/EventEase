import { useEffect, useState } from "react";
import { getRegistrationsByEventApi } from "../../api/registrationsApi";

export function useAdminRegistrations(eventId) {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");
      try {
        const data = await getRegistrationsByEventApi(eventId);
        if (!data.success)
          throw new Error(data.message || "Failed to load registrations");
        setRegistrations(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (eventId) load();
  }, [eventId]);

  return { registrations, loading, error };
}
