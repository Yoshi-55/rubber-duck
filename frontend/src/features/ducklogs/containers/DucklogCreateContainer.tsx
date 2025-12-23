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

    if (!title.trim() || !content.trim()) {
      return;
    }

    try {
      await create({
        title: title.trim(),
        content: content.trim(),
      });
      navigate("/list");
    } catch {
      // エラーはuseCreateDucklogで処理済み
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      {error && <ErrorMessage message={error} />}

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
          disabled={loading}
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
          disabled={loading}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 resize-vertical"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
        >
          保存する
        </button>
        <button
          type="button"
          onClick={() => navigate("/list")}
          disabled={loading}
          className="px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
        >
          キャンセル
        </button>
      </div>
    </form>
  );
}
