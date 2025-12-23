import { useState, useEffect } from "react";
import { fetchDucklog } from "../api/ducklog";
import type { DuckLog } from "../types/ducklog";

export function useDucklog(id: string | undefined) {
  const [ducklog, setDucklog] = useState<DuckLog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("IDが指定されていません");
      setLoading(false);
      return;
    }

    const loadDucklog = async () => {
      try {
        setLoading(true);
        const data = await fetchDucklog(id);
        setDucklog(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "エラーが発生しました");
      } finally {
        setLoading(false);
      }
    };

    loadDucklog();
  }, [id]);

  return { ducklog, loading, error };
}
