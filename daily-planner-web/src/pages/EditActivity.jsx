import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getActivities, saveActivities } from "../utils/storage";
import "../App.css";

function EditActivity() {
  const { id } = useParams();
  const navigate = useNavigate();

  const activities = getActivities();
  const activity = activities.find(
    (item) => item.id === Number(id)
  );

  const [title, setTitle] = useState(activity?.title || "");
  const [date, setDate] = useState(activity?.date || "");
  const [time, setTime] = useState(activity?.time || "12:00");
  const [priority, setPriority] = useState(
    activity?.priority || "Medie"
  );
  const [status, setStatus] = useState(
    activity?.status || "Urmează"
  );

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim()) return;

    const updatedActivities = activities.map((item) =>
      item.id === Number(id)
        ? {
            ...item,
            title: title.trim(),
            date,
            time,
            priority,
            status,
          }
        : item
    );

    saveActivities(updatedActivities);
    navigate("/");
  }

  if (!activity) {
    return (
      <main className="main-content">
        <h2>Activitatea nu a fost găsită.</h2>
        <button onClick={() => navigate("/")}>
          Înapoi la Dashboard
        </button>
      </main>
    );
  }

  return (
    <main className="main-content">
      <section className="welcome-section">
        <div>
          <h1>Editează activitatea ✏️</h1>
          <p className="subtitle">
            Modifică detaliile activității tale.
          </p>
        </div>
      </section>

      <form className="activity-form" onSubmit={handleSubmit}>
        <label htmlFor="edit-title">Denumire</label>
        <input
          id="edit-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />

        <div className="form-row">
          <div>
            <label htmlFor="edit-date">Data</label>
            <input
              id="edit-date"
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="edit-time">Ora</label>
            <input
              id="edit-time"
              type="time"
              value={time}
              onChange={(event) => setTime(event.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="edit-priority">Prioritate</label>
            <select
              id="edit-priority"
              value={priority}
              onChange={(event) => setPriority(event.target.value)}
            >
              <option>Scăzută</option>
              <option>Medie</option>
              <option>Ridicată</option>
            </select>
          </div>
        </div>

        <label htmlFor="edit-status">Status</label>
        <select
          id="edit-status"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          <option>Urmează</option>
          <option>Restant</option>
          <option>Complet</option>
          <option>Anulat</option>
        </select>

        <div className="form-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={() => navigate("/")}
          >
            Anulează
          </button>

          <button type="submit" className="primary-button">
            Salvează modificările
          </button>
        </div>
      </form>
    </main>
  );
}

export default EditActivity;