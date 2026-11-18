
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

const SETTINGS_KEY = "daily-planner-settings";

const defaultSettings = {
  theme: "light",
  color: "blue",
  showGreeting: true,
};

function Settings() {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_KEY);
      return saved
        ? { ...defaultSettings, ...JSON.parse(saved) }
        : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  useEffect(() => {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));

  window.dispatchEvent(new Event("settingsChanged"));
}, [settings]);

  function updateSetting(key, value) {
    setSettings((previous) => ({
      ...previous,
      [key]: value,
    }));
  }

  return (
    <div className="settings-page">
      <div className="settings-card">
        <Link to="/" className="back-link">
          ← Înapoi la Dashboard
        </Link>

        <h1>Setări</h1>
        <p className="settings-description">
          Personalizează experiența ta Daily Planner.
        </p>

        <section className="settings-section">
          <h2>🎨 Aspectul aplicației</h2>
          <label htmlFor="theme">Tema</label>
          <select
            id="theme"
            value={settings.theme}
            onChange={(e) => updateSetting("theme", e.target.value)}
          >
            <option value="light">Temă deschisă</option>
            <option value="dark">Temă întunecată</option>
          </select>
        </section>

        <section className="settings-section">
          <h2>💙 Culoare principală</h2>
          <div className="color-options">
            {[
              { value: "blue", label: "Albastru", color: "#6495ed" },
              { value: "purple", label: "Mov", color: "#9b82d8" },
              { value: "pink", label: "Roz", color: "#e88cae" },
              { value: "green", label: "Verde", color: "#70b99b" },
            ].map((item) => (
              <button
                key={item.value}
                type="button"
                title={item.label}
                aria-label={item.label}
                className={
                  settings.color === item.value
                    ? "color-option selected"
                    : "color-option"
                }
                style={{ backgroundColor: item.color }}
                onClick={() => updateSetting("color", item.value)}
              />
            ))}
          </div>
          <p>Culoare selectată: {settings.color}</p>
        </section>

        <section className="settings-section">
          <h2>👋 Mesaj de întâmpinare</h2>
          <label className="setting-toggle">
            <input
              type="checkbox"
              checked={settings.showGreeting}
              onChange={(e) =>
                updateSetting("showGreeting", e.target.checked)
              }
            />
            Afișează mesajul de întâmpinare
          </label>
        </section>

        <p className="settings-saved">
          ✓ Preferințele sunt salvate automat.
        </p>
      </div>
    </div>
  );
}

export default Settings;
