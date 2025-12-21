import DucklogCreateContainer from "../../features/ducklogs/containers/DucklogCreateContainer";

export default function DucklogCreatePage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">新しいラバーダックログ</h1>
        <p className="text-gray-600">今詰まっている内容を、順を追って説明してみましょう</p>
      </div>
      <DucklogCreateContainer />
    </div>
  );
}
