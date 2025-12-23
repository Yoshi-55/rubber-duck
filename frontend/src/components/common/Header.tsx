import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="mx-auto px-4 py-4 max-w-4xl">
        <Link to="/list">
          <h1 className="text-2xl font-bold text-gray-900 cursor-pointer hover:text-gray-700 transition-colors">
            RUBBER DUCK APP
          </h1>
        </Link>
      </div>
    </header>
  );
}
