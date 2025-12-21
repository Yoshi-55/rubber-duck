import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Rubber Duck App</h1>
      <p className="text-lg text-gray-600 mb-8">ラバーダッキング支援アプリ</p>
      <Link to="/list">
        <button className="px-8 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition-colors">
          はじめる
        </button>
      </Link>
    </div>
  );
}
