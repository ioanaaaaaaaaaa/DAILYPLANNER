
import { Link } from "react-router-dom";
import "../App.css";

function About() {
  return (
    <div className="about-page">
      <div className="about-card">
        <Link to="/dashboard" className="back-link">
  ← Înapoi la Dashboard
</Link>

        <div className="about-logo">📅</div>

        <h1>Daily Planner</h1>
        <p className="about-version">Versiunea 1.0</p>

        <div className="about-description">
          <h2>Despre aplicație</h2>
          <p>
            Daily Planner este o aplicație de organizare personală
            care te ajută să îți planifici activitățile zilnice,
            să îți stabilești prioritățile și să urmărești progresul.
          </p>
        </div>

        <div className="about-features">
          <h2>Ce poți face cu Daily Planner?</h2>
          <ul>
            <li>Adaugi, editezi și ștergi activități.</li>
            <li>Organizezi activitățile după prioritate.</li>
            <li>Urmărești statusul activităților.</li>
            <li>Cauți și filtrezi activitățile.</li>
            <li>Vizualizezi statistici și progresul zilnic.</li>
            <li>Îți personalizezi profilul și aspectul aplicației.</li>
          </ul>
        </div>

        <div className="about-team">
          <h2>Echipa proiectului</h2>
          <p>Carabelea Emma</p>
          <p>Baiculescu Teodora</p>
          <p>Ignea Ioana-Ștefania</p>
          <p>Drăgoi Denisa-Elena</p>
        </div>

        <div className="about-footer">
          <p>Realizat în cadrul proiectului universitar SOPM.</p>
          <p>Daily Planner – Organizează-ți ziua, pas cu pas. 💙</p>
        </div>
      </div>
    </div>
  );
}

export default About;
