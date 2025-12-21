import { useParams, useNavigate } from "react-router-dom";
import { useDucklog } from "../../../hooks/useDucklog";
import { useDeleteDucklog } from "../../../hooks/useDeleteDucklog";
import Loading from "../../../components/common/Loading";
import EmptyState from "../../../components/common/EmptyState";

export default function DucklogDetailContainer() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { ducklog, loading, error } = useDucklog(id);
  const { remove, deleting } = useDeleteDucklog();

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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button onClick={() => navigate("/list")}>← 一覧に戻る</button>
        <div>
          <button
            onClick={() => navigate(`/list/${id}/edit`)}
            style={{ marginRight: "10px" }}
          >
            編集
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            style={{ color: "red" }}
          >
            {deleting ? "削除中..." : "削除"}
          </button>
        </div>
      </div>

      <article>
        <h2>title: {ducklog.title || "（タイトルなし）"}</h2>
        <div style={{ whiteSpace: "pre-wrap" }}>content: {ducklog.content}</div>
        <p>
          <small>作成日時: {new Date(ducklog.created_at).toLocaleString("ja-JP")}</small>
        </p>
      </article>
    </div>
  );
}
