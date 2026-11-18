import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddActivity from "./pages/AddActivity";
import EditActivity from "./pages/EditActivity";
import SearchFilter from "./pages/SearchFilter";
import Statistics from "./pages/Statistics";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/search" element={<SearchFilter />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-activity" element={<AddActivity />} />
        <Route path="/edit-activity/:id" element={<EditActivity />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;