import { useParams, useNavigate } from "react-router-dom";
import { useDucklog } from "../../../hooks/useDucklog";
import { useDeleteDucklog } from "../../../hooks/useDeleteDucklog";
import Loading from "../../../components/common/Loading";
import ErrorMessage from "../../../components/common/ErrorMessage";
import EmptyState from "../../../components/common/EmptyState";

export default function DucklogDetailContainer() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { ducklog, loading, error } = useDucklog(id);
  const { remove, deleting, error: deleteError } = useDeleteDucklog();

  const handleDelete = async () => {
    if (!id) return;

    const success = await remove(id);
    if (success) {
      navigate("/list");
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error || !ducklog) {
    return (
      <EmptyState
        title={error || "ログが見つかりません"}
        actionText="一覧に戻る"
        actionLink="/list"
      />
    );
  }

  return (
    <div>
      {deleteError && <ErrorMessage message={deleteError} />}

      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate("/list")}
          className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
        >
          ← 一覧に戻る
        </button>
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/list/${id}/edit`)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            編集
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed transition-colors"
          >
            {deleting ? "削除中..." : "削除"}
          </button>
        </div>
      </div>

      <article className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {ducklog.title || "（タイトルなし）"}
        </h2>
        <div className="text-gray-700 whitespace-pre-wrap mb-4 leading-relaxed">
          {ducklog.content}
        </div>
        <p className="text-sm text-gray-500 border-t border-gray-200 pt-3">
          作成日時: {new Date(ducklog.created_at).toLocaleString("ja-JP")}
        </p>
      </article>
    </div>
  );
}
