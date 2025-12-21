import { useState } from "react";
import { deleteDucklog } from "../api/ducklog";

export function useDeleteDucklog() {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = async (id: string) => {
    const confirmed = window.confirm("このログを削除しますか？");
    if (!confirmed) return false;

    try {
      setDeleting(true);
      await deleteDucklog(id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "削除に失敗しました");
      return false;
    } finally {
      setDeleting(false);
    }
  };

  return { remove, deleting, error };
}
