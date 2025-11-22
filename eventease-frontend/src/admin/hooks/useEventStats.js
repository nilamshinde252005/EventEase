import { useEffect, useState } from "react";

import { getEventStatsApi } from "../../api/eventsApi";

export function useEventStats(eventId) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!eventId) return;

    async function load() {
      setLoading(true);
      setError("");
      try {
        const res = await getEventStatsApi(eventId);
        if (!res.success) throw new Error(res.message || "Failed to load stats");
        setStats(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [eventId]);

  return { stats, loading, error };
}
