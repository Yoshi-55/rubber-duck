import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import DucklogListPage from "./pages/ducklogs/ducklogListPage";
import DucklogCreatePage from "./pages/ducklogs/ducklogCreatePage";
import DucklogDetailPage from "./pages/ducklogs/ducklogDetailPage";
import DucklogEditPage from "./pages/ducklogs/ducklogEditPage";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto px-4 py-8 max-w-4xl">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/list" element={<DucklogListPage />} />
          <Route path="/create" element={<DucklogCreatePage />} />
          <Route path="/list/:id" element={<DucklogDetailPage />} />
          <Route path="/list/:id/edit" element={<DucklogEditPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
