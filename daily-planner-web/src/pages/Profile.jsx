
import { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { getActiveProfile, updateProfile } from "../utils/profiles";

function Profile() {
  const [profile, setProfile] = useState(getActiveProfile);
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(profile?.name || "");

  const avatars = ["👤", "👩", "👩‍💻", "🧑‍🎓", "🌸", "⭐"];

  function saveName() {
    if (!newName.trim() || !profile) return;

    const updatedProfiles = updateProfile(profile.id, {
      name: newName.trim(),
    });

    const updatedProfile = updatedProfiles.find(
      (item) => item.id === profile.id
    );

    setProfile(updatedProfile);
    setEditing(false);
  }

  function saveAvatar(avatar) {
    if (!profile) return;

    const updatedProfiles = updateProfile(profile.id, { avatar });

    const updatedProfile = updatedProfiles.find(
      (item) => item.id === profile.id
    );

    setProfile(updatedProfile);
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
       <Link to="/dashboard" className="back-link">
          ← Înapoi la Dashboard
        </Link>

        <h1>Profilul meu</h1>
        <p className="profile-description">
          Personalizează-ți profilul Daily Planner.
        </p>

        <div className="profile-avatar">
          {profile.avatar}
        </div>

        <h2>{profile.name}</h2>

        <h3>Alege un avatar</h3>

        <div className="avatar-options">
          {avatars.map((avatar) => (
            <button
              key={avatar}
              className={
                profile.avatar === avatar ? "avatar-option selected" : "avatar-option"
              }
              onClick={() => saveAvatar(avatar)}
            >
              {avatar}
            </button>
          ))}
        </div>

        {editing ? (
          <div className="profile-edit">
            <label>Numele tău</label>
            <input
              value={newName}
              onChange={(event) => setNewName(event.target.value)}
              placeholder="Introdu numele"
            />

            <button className="profile-save" onClick={saveName}>
              Salvează
            </button>
            <button
              className="profile-cancel"
              onClick={() => {
                setNewName(profile.name);
                setEditing(false);
              }}
            >
              Anulează
            </button>
          </div>
        ) : (
          <button
            className="profile-edit-button"
            onClick={() => setEditing(true)}
          >
            ✏️ Modifică numele
          </button>
        )}
      </div>
    </div>
  );
}

export default Profile;
