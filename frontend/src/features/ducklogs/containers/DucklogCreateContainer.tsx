import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateDucklog } from "../../../hooks/useCreateDucklog";
import ErrorMessage from "../../../components/common/ErrorMessage";

export default function DucklogCreateContainer() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const { create, loading, error } = useCreateDucklog();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      return;
    }

    try {
      await create({
        title: title.trim() || null,
        content: content.trim(),
      });
      navigate("/list");
    } catch {
      // エラーはuseCreateDucklogで処理済み
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <ErrorMessage message={error} />}

      <div>
        <label htmlFor="title">タイトル</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="例: React の hooks で詰まった"
          disabled={loading}
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
          disabled={loading}
          required
        />
      </div>

      <div>
        <button type="submit" disabled={loading}>
          {loading ? "保存中..." : "保存する"}
        </button>
        <button
          type="button"
          onClick={() => navigate("/list")}
          disabled={loading}
        >
          キャンセル
        </button>
      </div>
    </form>
  );
}
