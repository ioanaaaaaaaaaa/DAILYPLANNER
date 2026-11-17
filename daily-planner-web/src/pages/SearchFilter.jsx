
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getActivities } from "../utils/storage";
import "../App.css";

function SearchFilter() {
  const navigate = useNavigate();
  const [activities] = useState(getActivities);
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("Toate");
  const [priority, setPriority] = useState("Toate");
  const [date, setDate] = useState("");

  const filteredActivities = activities.filter((activity) => {
    const matchesName = activity.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      status === "Toate" || activity.status === status;

    const matchesPriority =
      priority === "Toate" || activity.priority === priority;

    const matchesDate =
      date === "" || activity.date === date;

    return (
      matchesName &&
      matchesStatus &&
      matchesPriority &&
      matchesDate
    );
  });

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

          <Link className="nav-link active" to="/search">
            🔎 Căutare și filtrare
          </Link>

          <a className="nav-link" href="/#statistics">
            📊 Statistici
          </a>
        </nav>

        <div className="sidebar-bottom">
          Organizează-ți ziua, pas cu pas.
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <span>Căutare și filtrare</span>
          <span className="profile">👤</span>
        </header>

        <section className="welcome-section">
          <div>
            <h1>Găsește activitățile 🔎</h1>
            <p className="subtitle">
              Caută și organizează-ți activitățile.
            </p>
          </div>
        </section>

        <section className="activity-form">
          <h2>Filtrează activitățile</h2>

          <label htmlFor="search-name">Caută după denumire</label>
          <input
            id="search-name"
            type="text"
            placeholder="Scrie numele activității..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />

          <div className="form-row">
            <div>
              <label htmlFor="search-status">Status</label>
              <select
                id="search-status"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
              >
                <option value="Toate">Toate statusurile</option>
                <option>Urmează</option>
                <option>Restant</option>
                <option>Complet</option>
                <option>Anulat</option>
              </select>
            </div>

            <div>
              <label htmlFor="search-priority">Prioritate</label>
              <select
                id="search-priority"
                value={priority}
                onChange={(event) => setPriority(event.target.value)}
              >
                <option value="Toate">Toate prioritățile</option>
                <option>Scăzută</option>
                <option>Medie</option>
                <option>Ridicată</option>
              </select>
            </div>

            <div>
              <label htmlFor="search-date">Data</label>
              <input
                id="search-date"
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
              />
            </div>
          </div>

          <div className="form-actions">
            <button
              className="secondary-button"
              onClick={() => {
                setSearchTerm("");
                setStatus("Toate");
                setPriority("Toate");
                setDate("");
              }}
            >
              Resetează filtrele
            </button>
          </div>
        </section>

        <section className="activities-section">
          <div className="section-heading">
            <div>
              <h2>Rezultatele căutării</h2>
              <p>
                {filteredActivities.length} activități găsite
              </p>
            </div>
          </div>

          {filteredActivities.length === 0 ? (
            <div className="empty-state">
              <span>🔎</span>
              <h3>Nu am găsit activități</h3>
              <p>Încearcă alte criterii de căutare.</p>
            </div>
          ) : (
            <div className="activity-list">
              {filteredActivities
                .slice()
                .sort((a, b) =>
                  `${a.date} ${a.time}`.localeCompare(
                    `${b.date} ${b.time}`
                  )
                )
                .map((activity) => (
                  <article
                    className="activity-item"
                    key={activity.id}
                  >
                    <div className="activity-info">
                      <h3>{activity.title}</h3>
                      <p>
                        📅 {activity.date} · 🕒 {activity.time}
                      </p>
                      <span className="priority-label">
                        Prioritate: {activity.priority}
                      </span>
                    </div>

                    <div className="activity-actions">
                      <span
                        className={`status ${
                          activity.status === "Urmează"
                            ? "status-upcoming"
                            : activity.status === "Restant"
                            ? "status-overdue"
                            : activity.status === "Complet"
                            ? "status-completed"
                            : "status-canceled"
                        }`}
                      >
                        {activity.status}
                      </span>

                      <button
                        className="edit-button"
                        onClick={() =>
                          navigate(`/edit-activity/${activity.id}`)
                        }
                      >
                        ✏️
                      </button>
                    </div>
                  </article>
                ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default SearchFilter;
