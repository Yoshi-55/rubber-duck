import { useState } from "react";
import type { FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { NavigateFunction } from "react-router-dom";
import { useDucklog } from "../../../hooks/useDucklog";
import { useUpdateDucklog } from "../../../hooks/useUpdateDucklog";
import type { DuckLog } from "../../../types/ducklog";
import Loading from "../../../components/common/Loading";
import ErrorMessage from "../../../components/common/ErrorMessage";
import EmptyState from "../../../components/common/EmptyState";

export default function DucklogEditContainer() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { ducklog, loading: fetchLoading, error: fetchError } = useDucklog(id);
  const { update, loading: updating, error: updateError } = useUpdateDucklog();

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

  return <DucklogEditForm ducklog={ducklog} updating={updating} updateError={updateError} update={update} navigate={navigate} id={id} />;
}

interface DucklogEditFormProps {
  ducklog: DuckLog;
  updating: boolean;
  updateError: string | null;
  update: (id: string, data: { title: string | null; content: string }) => Promise<DuckLog>;
  navigate: NavigateFunction;
  id: string | undefined;
}

function DucklogEditForm({ ducklog, updating, updateError, update, navigate, id }: DucklogEditFormProps) {
  const [title, setTitle] = useState(ducklog.title || "");
  const [content, setContent] = useState(ducklog.content || "");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!id || !title.trim() || !content.trim()) {
      return;
    }

    try {
      await update(id, {
        title: title.trim(),
        content: content.trim(),
      });
      navigate(`/list/${id}`);
    } catch {
      // エラーはuseUpdateDucklogで処理済み
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      {updateError && <ErrorMessage message={updateError} />}

      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          タイトル（必須）
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="整理したいテーマや課題を入力してください"
          disabled={updating}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
          説明（必須）
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="何に詰まっているか、順を追って説明してください..."
          rows={10}
          disabled={updating}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 resize-vertical"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={updating}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
        >
          更新する
        </button>
        <button
          type="button"
          onClick={() => navigate(`/list/${id}`)}
          disabled={updating}
          className="px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
        >
          キャンセル
        </button>
      </div>
    </form>
  );
}
