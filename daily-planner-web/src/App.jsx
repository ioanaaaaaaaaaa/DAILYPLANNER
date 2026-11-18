
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import AddActivity from "./pages/AddActivity";
import EditActivity from "./pages/EditActivity";
import SearchFilter from "./pages/SearchFilter";
import Statistics from "./pages/Statistics";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import About from "./pages/About";
import ChooseProfile from "./pages/ChooseProfile";

function App() {
  const activeProfile = localStorage.getItem("daily-planner-active-profile");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChooseProfile />} />
<Route path="/choose-profile" element={<ChooseProfile />} />
<Route path="/dashboard" element={<Dashboard />} />
        /
        <Route path="/choose-profile" element={<ChooseProfile />} />
        <Route path="/search" element={<SearchFilter />} />
        <Route path="/add-activity" element={<AddActivity />} />
        <Route path="/edit-activity/:id" element={<EditActivity />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
