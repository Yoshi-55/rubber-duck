import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import DucklogListPage from "./pages/ducklogs/ducklogListPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/list" element={<DucklogListPage />} />
    </Routes>
  );
}

export default App;
