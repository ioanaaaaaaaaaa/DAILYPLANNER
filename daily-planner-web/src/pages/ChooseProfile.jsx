
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfiles, setActiveProfileId } from "../utils/profiles";
import "../App.css";

function ChooseProfile() {
  const [profiles, setProfiles] = useState(getProfiles);
  const navigate = useNavigate();

  function selectProfile(profile) {
  setActiveProfileId(profile.id);
  navigate("/dashboard");
}

  return (
    <div className="choose-profile-page">
      <div className="choose-profile-container">
        <div className="choose-profile-logo">📅</div>

        <h1>Cine folosește Daily Planner?</h1>
        <p>Alege profilul tău pentru a-ți organiza ziua.</p>

        <div className="profiles-grid">
          {profiles.map((profile) => (
            <button
              key={profile.id}
              className="profile-card-option"
              onClick={() => selectProfile(profile)}
            >
              <span className="profile-card-avatar">
                {profile.avatar}
              </span>

              <span className="profile-card-name">
                {profile.name}
              </span>

              <span className="profile-card-description">
                Profil personal
              </span>
            </button>
          ))}
        </div>

        <p className="choose-profile-footer">
          Daily Planner – Organizează-ți ziua, pas cu pas. 💙
        </p>
      </div>
    </div>
  );
}

export default ChooseProfile;
