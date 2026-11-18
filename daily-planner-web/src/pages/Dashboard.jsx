
import { useEffect, useState } from "react";
import { getActivities, saveActivities } from "../utils/storage";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();
  const [activities, setActivities] = useState(getActivities);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [time, setTime] = useState("12:00");
  const [priority, setPriority] = useState("Medie");
  const [searchTerm, setSearchTerm] = useState("");
const [filterStatus, setFilterStatus] = useState("Toate");

  useEffect(() => {
    saveActivities(activities);
  }, [activities]);

  // Actualizează automat activitățile restante
useEffect(() => {
  function checkOverdueActivities() {
    const now = new Date();

    setActivities((currentActivities) =>
      currentActivities.map((activity) => {
        const activityDate = new Date(
          `${activity.date}T${activity.time}:00`
        );

        if (
          activity.status === "Urmează" &&
          activityDate < now
        ) {
          return {
            ...activity,
            status: "Restant",
          };
        }

        return activity;
      })
    );
  }

  checkOverdueActivities();

  const interval = setInterval(
    checkOverdueActivities,
    30000
  );

  return () => clearInterval(interval);
}, []);

  const completed = activities.filter(
    (activity) => activity.status === "Complet"
  ).length;

  const overdue = activities.filter(
    (activity) => activity.status === "Restant"
  ).length;

  const upcoming = activities.filter(
  (activity) => activity.status === "Urmează"
).length;

const canceled = activities.filter(
  (activity) => activity.status === "Anulat"
).length;

  const progress =
    activities.length === 0
      ? 0
      : Math.round((completed / activities.length) * 100);

  function addActivity(event) {
    event.preventDefault();

    if (!title.trim()) return;

    const newActivity = {
      id: Date.now(),
      title: title.trim(),
      date,
      time,
      priority,
      status: "Urmează",
    };

    setActivities([...activities, newActivity]);
    setTitle("");
    setTime("12:00");
    setPriority("Medie");
    setShowForm(false);
  }

  function changeStatus(id, newStatus) {
    setActivities(
      activities.map((activity) =>
        activity.id === id
          ? { ...activity, status: newStatus }
          : activity
      )
    );
  }

  function deleteActivity(id) {
    setActivities(
      activities.filter((activity) => activity.id !== id)
    );
  }

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <h2 className="logo">☁ Daily Planner</h2>

        <p className="menu-label">MENIU</p>

        <nav>
  <Link className="nav-link active" to="/">
    🏠 Dashboard
  </Link>

  <Link className="nav-link" to="/add-activity">
    ➕ Activitate nouă
  </Link>

  <Link className="nav-link" to="/search">
  🔎 Căutare și filtrare
</Link>

  <Link className="nav-link" to="/statistics">
  📊 Statistici
</Link>
</nav>

        <div className="sidebar-bottom">
          Organizează-ți ziua, pas cu pas.
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <span>Planificatorul meu</span>
          <span className="profile">👤</span>
        </header>

        <section className="welcome-section">
          <div>
            <p className="date-label">
              {new Date().toLocaleDateString("ro-RO", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>

            <h1>Bună! 👋</h1>
            <p className="subtitle">
              Hai să facem ziua aceasta productivă!
            </p>
          </div>

          <button
            className="primary-button"
            onClick={() => setShowForm(!showForm)}
          >
            + Adaugă activitate
          </button>
        </section>

        {showForm && (
          <form className="activity-form" onSubmit={addActivity}>
            <h2>Activitate nouă</h2>

            <label htmlFor="activity-title">Denumire</label>
            <input
              id="activity-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Ce ai de făcut?"
              required
            />

            <div className="form-row">
              <div>
                <label htmlFor="activity-date">Data</label>
                <input
                  id="activity-date"
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="activity-time">Ora</label>
                <input
                  id="activity-time"
                  type="time"
                  value={time}
                  onChange={(event) => setTime(event.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="activity-priority">Prioritate</label>
                <select
                  id="activity-priority"
                  value={priority}
                  onChange={(event) => setPriority(event.target.value)}
                >
                  <option>Scăzută</option>
                  <option>Medie</option>
                  <option>Ridicată</option>
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="secondary-button"
                onClick={() => setShowForm(false)}>
                Anulează
              </button>
              <button type="submit" className="primary-button">
                Salvează activitatea
              </button>
            </div>
          </form>
        )}

        <section className="stats-grid">
          <div className="stat-card blue-card">
            <span>Total activități</span>
            <strong>{activities.length}</strong>
            <span>📝 Planificate</span>
          </div>

          <div className="stat-card green-card">
            <span>Finalizate</span>
            <strong>{completed}</strong>
            <span>✓ Activități completate</span>
          </div>

          <div className="stat-card pink-card">
            <span>Restante</span>
            <strong>{overdue}</strong>
            <span>⏰ Necesită atenție</span>
          </div>
        </section>

        <div className="stat-card blue-card">
  <span>Urmează</span>
  <strong>{upcoming}</strong>
  <span>📅 Activități în așteptare</span>
</div>

<div className="stat-card gray-card">
  <span>Anulate</span>
  <strong>{canceled}</strong>
  <span>✖ Activități anulate</span>
</div>

        <section className="progress-card">
          <div className="progress-heading">
            <div>
              <h2>Progresul zilei</h2>
              <p>Continuă în ritmul tău!</p>
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

        <section className="activities-section" id="activities">
            <div className="search-filter">
  <input
    type="text"
    placeholder="🔎 Caută o activitate..."
    value={searchTerm}
    onChange={(event) => setSearchTerm(event.target.value)}
  />

  <select
    value={filterStatus}
    onChange={(event) => setFilterStatus(event.target.value)}
  >
    <option value="Toate">Toate statusurile</option>
    <option value="Urmează">Urmează</option>
    <option value="Restant">Restant</option>
    <option value="Complet">Complet</option>
    <option value="Anulat">Anulat</option>
  </select>
</div>
          <div className="section-heading">
            <div>
              <h2>Activitățile mele</h2>
              <p>Lista activităților planificate</p>
            </div>
          </div>

          {activities.length === 0 ? (
            <div className="empty-state">
              <span>🌸</span>
              <h3>Nu ai activități încă</h3>
              <p>Adaugă prima activitate și organizează-ți ziua!</p>
            </div>
          ) : (
            <div className="activity-list">
             {[...activities]
  .filter((activity) => {
    const matchesSearch = activity.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "Toate" ||
      activity.status === filterStatus;

    return matchesSearch && matchesStatus;
  })
  .sort((a, b) =>
    `${a.date} ${a.time}`.localeCompare(
      `${b.date} ${b.time}`
    )
  )
  .map((activity) => (
                  <article className="activity-item" key={activity.id}>
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
                        <button
  className="edit-button"
  onClick={() =>
    navigate(`/edit-activity/${activity.id}`)
  }
  aria-label={`Editează ${activity.title}`}
>
  ✏️
</button>
                      <select
                        value={activity.status}
                        onChange={(event) =>
                          changeStatus(activity.id, event.target.value)
                        }
                        aria-label={`Status pentru ${activity.title}`}
                      >
                        <option>Urmează</option>
                        <option>Restant</option>
                        <option>Complet</option>
                        <option>Anulat</option>
                      </select>

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
                        className="delete-button"
                        onClick={() => deleteActivity(activity.id)}
                        aria-label={`Șterge ${activity.title}`}
                      >
                        🗑
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

export default Dashboard;
