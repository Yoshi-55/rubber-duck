import { useState } from "react";
import { updateDucklog } from "../api/ducklog";

export function useUpdateDucklog() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = async (
    id: string,
    data: { title: string | null; content: string }
  ) => {
    try {
      setLoading(true);
      setError(null);
      const result = await updateDucklog(id, data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : "更新に失敗しました");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { update, loading, error };
}
