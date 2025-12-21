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
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>ログ一覧</h2>
        <Link to="/create">
          <button>+ 新規作成</button>
        </Link>
      </div>
      <ul>
        {ducklogs.map((ducklog) => (
          <li key={ducklog.id}>
            <Link to={`/list/${ducklog.id}`}>
              <h3>{ducklog.title || "（タイトルなし）"}</h3>
              <p>{ducklog.content.substring(0, 100)}{ducklog.content.length > 100 ? "..." : ""}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
