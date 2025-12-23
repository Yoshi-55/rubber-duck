import { useState, useEffect } from "react";
import { fetchDucklogs } from "../api/ducklog";
import type { DuckLog } from "../types/ducklog";

export function useDucklogs() {
  const [ducklogs, setDucklogs] = useState<DuckLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDucklogs = async () => {
      try {
        setLoading(true);
        const data = await fetchDucklogs();
        setDucklogs(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "エラーが発生しました");
      } finally {
        setLoading(false);
      }
    };

    loadDucklogs();
  }, []);

  return { ducklogs, loading, error };
}
