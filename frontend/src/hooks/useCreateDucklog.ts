import { useState } from "react";
import { createDucklog } from "../api/ducklog";

export function useCreateDucklog() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = async (data: { title: string | null; content: string }) => {
    try {
      setLoading(true);
      setError(null);
      const result = await createDucklog(data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { create, loading, error };
}
