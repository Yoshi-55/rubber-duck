import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      <h1>Ruber Duck App</h1>
      <p>ラバーダッキング支援アプリ</p>
      <Link to="/list">はじめる</Link>
    </div>
  );
}
