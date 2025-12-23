import DucklogEditContainer from "../../features/ducklogs/containers/DucklogEditContainer";

export default function DucklogEditPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">ログ編集</h1>
      </div>
      <DucklogEditContainer />
    </div>
  );
}
