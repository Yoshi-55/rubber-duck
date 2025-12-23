import DucklogDetailContainer from "../../features/ducklogs/containers/DucklogDetailContainer";

export default function DucklogDetailPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">詳細ログ</h1>
      </div>
      <DucklogDetailContainer />
    </div>
  );
}
