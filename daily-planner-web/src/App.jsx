
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import AddActivity from "./pages/AddActivity";
import EditActivity from "./pages/EditActivity";
import SearchFilter from "./pages/SearchFilter";
import Statistics from "./pages/Statistics";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

function App() {
  useEffect(() => {
    function applySettings() {
      let settings = {};

      try {
        settings = JSON.parse(
          localStorage.getItem("daily-planner-settings")
        ) || {};
      } catch {
        settings = {};
      }

      const colors = {
        blue: "#6495ed",
        purple: "#9b82d8",
        pink: "#e88cae",
        green: "#70b99b",
      };

      document.documentElement.dataset.theme =
        settings.theme || "light";

      document.documentElement.style.setProperty(
        "--primary-color",
        colors[settings.color] || colors.blue
      );
    }

    applySettings();

    window.addEventListener("settingsChanged", applySettings);

    return () => {
      window.removeEventListener("settingsChanged", applySettings);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/search" element={<SearchFilter />} />
        <Route path="/add-activity" element={<AddActivity />} />
        <Route path="/edit-activity/:id" element={<EditActivity />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
