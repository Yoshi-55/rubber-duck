import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDucklog } from "../../../hooks/useDucklog";
import { useUpdateDucklog } from "../../../hooks/useUpdateDucklog";
import Loading from "../../../components/common/Loading";
import ErrorMessage from "../../../components/common/ErrorMessage";
import EmptyState from "../../../components/common/EmptyState";

export default function DucklogEditContainer() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { ducklog, loading: fetchLoading, error: fetchError } = useDucklog(id);
  const { update, loading: updating, error: updateError } = useUpdateDucklog();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // ログデータをフォームに反映
  useEffect(() => {
    if (ducklog) {
      setTitle(ducklog.title || "");
      setContent(ducklog.content);
    }
  }, [ducklog]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!id || !content.trim()) {
      return;
    }

    try {
      await update(id, {
        title: title.trim() || null,
        content: content.trim(),
      });
      navigate(`/list/${id}`);
    } catch {
      // エラーはuseUpdateDucklogで処理済み
    }
  };

  if (fetchLoading) {
    return <Loading />;
  }

  if (fetchError || !ducklog) {
    return (
      <EmptyState
        title={fetchError || "ログが見つかりません"}
        actionText="一覧に戻る"
        actionLink="/list"
      />
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {updateError && <ErrorMessage message={updateError} />}

      <div>
        <label htmlFor="title">タイトル</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="例: React の hooks で詰まった"
          disabled={updating}
        />
      </div>

      <div>
        <label htmlFor="content">説明（必須）</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="何に詰まっているか、順を追って説明してください..."
          rows={10}
          disabled={updating}
          required
        />
      </div>

      <div>
        <button type="submit" disabled={updating}>
          {updating ? "更新中..." : "更新する"}
        </button>
        <button
          type="button"
          onClick={() => navigate(`/list/${id}`)}
          disabled={updating}
        >
          キャンセル
        </button>
      </div>
    </form>
  );
}
