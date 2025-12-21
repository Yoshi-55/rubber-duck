import { Link } from "react-router-dom";
import { useDucklogs } from "../../../hooks/useDucklogs";
import Loading from "../../../components/common/Loading";
import ErrorMessage from "../../../components/common/ErrorMessage";
import EmptyState from "../../../components/common/EmptyState";

export default function DucklogListContainer() {
  const { ducklogs, loading, error } = useDucklogs();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (ducklogs.length === 0) {
    return (
      <EmptyState
        title="ログがまだありません"
        description="最初のログを作成しましょう"
        actionText="新規作成"
        actionLink="/create"
      />
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">ログ一覧</h2>
        <Link to="/create">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
            + 新規作成
          </button>
        </Link>
      </div>
      <div className="grid gap-4">
        {ducklogs.map((ducklog) => (
          <Link
            key={ducklog.id}
            to={`/list/${ducklog.id}`}
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-blue-300 transition-all"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {ducklog.title || "（タイトルなし）"}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-3">
              {ducklog.content.substring(0, 100)}{ducklog.content.length > 100 ? "..." : ""}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
