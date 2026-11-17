
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getActivities, saveActivities } from "../utils/storage";
import "../App.css";

function AddActivity() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [priority, setPriority] = useState("Medie");

  function handleSubmit(event) {
    event.preventDefault();

    const activities = getActivities();

    const newActivity = {
      id: Date.now(),
      title,
      description,
      date,
      time,
      priority,
      status: "Urmează",
    };

    saveActivities([...activities, newActivity]);

    navigate("/");
  }

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <h2 className="logo">☁ Daily Planner</h2>
        <p className="menu-label">MENIU</p>

        <nav>
          <Link className="nav-link" to="/">🏠 Dashboard</Link>
          <Link className="nav-link active" to="/add-activity">
            ➕ Activitate nouă
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
            <p className="date-label">Organizează-ți timpul</p>
            <h1>Adaugă o activitate ✨</h1>
            <p className="subtitle">
              Completează detaliile activității tale.
            </p>
          </div>
        </section>

        <form className="activity-form" onSubmit={handleSubmit}>
          <h2>Detaliile activității</h2>

          <label htmlFor="title">Denumirea activității</label>
          <input
            id="title"
            type="text"
            placeholder="Ex: Învățat pentru facultate"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />

          <label htmlFor="description">Descriere</label>
          <textarea
            id="description"
            rows="4"
            placeholder="Adaugă câteva detalii..."
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />

          <div className="form-row">
            <div>
              <label htmlFor="date">Data</label>
              <input
                id="date"
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="time">Ora</label>
              <input
                id="time"
                type="time"
                value={time}
                onChange={(event) => setTime(event.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="priority">Prioritate</label>
              <select
                id="priority"
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
            <Link to="/" className="secondary-button">
              Înapoi
            </Link>

            <button type="submit" className="primary-button">
              Salvează activitatea
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default AddActivity;
