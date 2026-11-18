
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getActivities } from "../utils/storage";
import "../App.css";

function Statistics() {
  const [activities, setActivities] = useState(getActivities);

  useEffect(() => {
    const updateActivities = () => {
      setActivities(getActivities());
    };

    const interval = setInterval(updateActivities, 1000);

    return () => clearInterval(interval);
  }, []);

  const total = activities.length;

  const completed = activities.filter(
    (a) => a.status === "Complet"
  ).length;

  const overdue = activities.filter(
    (a) => a.status === "Restant"
  ).length;

  const upcoming = activities.filter(
    (a) => a.status === "Urmează"
  ).length;

  const canceled = activities.filter(
    (a) => a.status === "Anulat"
  ).length;

  const today = new Date().toISOString().slice(0, 10);

  const todayActivities = activities.filter(
    (a) => a.date === today
  );

  const todayCompleted = todayActivities.filter(
    (a) => a.status === "Complet"
  ).length;

  const progress = todayActivities.length === 0
    ? 0
    : Math.round(
        (todayCompleted / todayActivities.length) * 100
      );

  const low = activities.filter(
    (a) => a.priority === "Scăzută"
  ).length;

  const medium = activities.filter(
    (a) => a.priority === "Medie"
  ).length;

  const high = activities.filter(
    (a) => a.priority === "Ridicată"
  ).length;

  function percentage(value) {
    return total === 0 ? 0 : Math.round((value / total) * 100);
  }

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <h2 className="logo">☁ Daily Planner</h2>
        <p className="menu-label">MENIU</p>

        <nav>
          <Link className="nav-link" to="/">
            🏠 Dashboard
          </Link>

          <Link className="nav-link" to="/add-activity">
            ➕ Activitate nouă
          </Link>

          <Link className="nav-link" to="/search">
            🔎 Căutare și filtrare
          </Link>

          <Link className="nav-link active" to="/statistics">
            📊 Statistici
          </Link>
        </nav>

        <div className="sidebar-bottom">
          Organizează-ți ziua, pas cu pas.
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <span>Statistici</span>
          <span className="profile">👤</span>
        </header>

        <section className="welcome-section">
          <div>
            <h1>Progresul tău 📊</h1>
            <p className="subtitle">
              Urmărește activitățile și rezultatele tale.
            </p>
          </div>
        </section>

        <section className="stats-grid">
          <div className="stat-card blue-card">
            <span>Total activități</span>
            <strong>{total}</strong>
            <span>📝 Planificate</span>
          </div>

          <div className="stat-card green-card">
            <span>Finalizate</span>
            <strong>{completed}</strong>
            <span>✓ Completate</span>
          </div>

          <div className="stat-card pink-card">
            <span>Restante</span>
            <strong>{overdue}</strong>
            <span>⏰ Necesită atenție</span>
          </div>

          <div className="stat-card blue-card">
            <span>Urmează</span>
            <strong>{upcoming}</strong>
            <span>📅 În așteptare</span>
          </div>

          <div className="stat-card gray-card">
            <span>Anulate</span>
            <strong>{canceled}</strong>
            <span>✖ Anulate</span>
          </div>
        </section>

        <section className="progress-card">
          <div className="progress-heading">
            <div>
              <h2>Progresul zilei</h2>
              <p>
                {todayCompleted} din {todayActivities.length} activități finalizate astăzi
              </p>
            </div>
            <strong>{progress}%</strong>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </section>

        <section className="activities-section">
          <h2>Distribuția activităților</h2>
          <p className="subtitle">Situația după status</p>

          {[
            { name: "Completate", value: completed, color: "#65BD98" },
            { name: "Restante", value: overdue, color: "#E98DA2" },
            { name: "Urmează", value: upcoming, color: "#6598E8" },
            { name: "Anulate", value: canceled, color: "#999EAE" },
          ].map((item) => (
            <div className="priority-stat" key={item.name}>
              <div className="priority-heading">
                <span>{item.name}</span>
                <strong>{item.value} ({percentage(item.value)}%)</strong>
              </div>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{
                    width: `${percentage(item.value)}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </div>
          ))}
        </section>

        <section className="activities-section">
          <h2>Activități după prioritate</h2>

          <div className="priority-summary">
            <p>🟢 Prioritate scăzută: <strong>{low}</strong></p>
            <p>🟡 Prioritate medie: <strong>{medium}</strong></p>
            <p>🔴 Prioritate ridicată: <strong>{high}</strong></p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Statistics;
