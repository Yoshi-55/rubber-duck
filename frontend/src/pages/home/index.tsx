import { Link } from "react-router-dom";
import duckImage from "../../assets/duck.png";

export default function HomePage() {
  return (
    <div className="text-center py-12">
      <img
        src={duckImage}
        alt="Rubber Duck"
        className="mx-auto mb-6 w-100 h-100 object-contain animate-sway"
      />
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Rubber Duck App</h1>

      <div className="max-w-2xl mx-auto mb-8 bg-white border border-gray-200 rounded-lg p-6 text-left">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">使い方</h3>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>何に詰まっているか、順を追って説明する</li>
          <li>コードの動作や期待する結果を文章化する</li>
          <li>説明しているうちに、問題点に気づく</li>
          <li>解決したら、ログに記録して振り返る</li>
        </ol>
      </div>

      <Link to="/list">
        <button className="px-8 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition-colors">
          はじめる
        </button>
      </Link>

      <h2 className="text-xl font-bold text-gray-900 mb-4">
        ラバーダッキングとは？
      </h2>
      <p className="text-gray-700 mb-4">
        プログラミングで詰まったとき、ラバーダック（アヒルのおもちゃ）に問題を説明することで、自分で解決策を見つける手法です。
      </p>
    </div>
  );
}
