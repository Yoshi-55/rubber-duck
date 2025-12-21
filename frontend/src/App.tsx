import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import DucklogListPage from "./pages/ducklogs/ducklogListPage";
import DucklogCreatePage from "./pages/ducklogs/ducklogCreatePage";
import DucklogDetailPage from "./pages/ducklogs/ducklogDetailPage";
import DucklogEditPage from "./pages/ducklogs/ducklogEditPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/list" element={<DucklogListPage />} />
      <Route path="/create" element={<DucklogCreatePage />} />
      <Route path="/list/:id" element={<DucklogDetailPage />} />
      <Route path="/list/:id/edit" element={<DucklogEditPage />} />
    </Routes>
  );
}

export default App;
