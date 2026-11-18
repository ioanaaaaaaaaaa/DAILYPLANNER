
const PROFILES_KEY = "daily-planner-profiles";
const ACTIVE_PROFILE_KEY = "daily-planner-active-profile";

export const defaultProfiles = [
  {
    id: "emma",
    name: "Emma",
    avatar: "👩‍🎓",
  },
  {
    id: "ioana",
    name: "Ioana",
    avatar: "🌸",
  },
  {
    id: "denisa",
    name: "Denisa",
    avatar: "⭐",
  },
  {
    id: "teodora",
    name: "Teodora",
    avatar: "💙",
  },
];

export function getProfiles() {
  try {
    const saved = localStorage.getItem(PROFILES_KEY);

    if (saved) {
      const profiles = JSON.parse(saved);

      return defaultProfiles.map((defaultProfile) => {
        const existing = profiles.find(
          (profile) => profile.id === defaultProfile.id
        );

        return existing
          ? { ...defaultProfile, ...existing }
          : defaultProfile;
      });
    }

    // Păstrăm numele și avatarul profilului actual.
    const oldProfile = JSON.parse(
      localStorage.getItem("daily-planner-profile") || "null"
    );

    const profiles = defaultProfiles.map((profile) =>
      profile.id === "emma" && oldProfile
        ? { ...profile, ...oldProfile, id: "emma" }
        : profile
    );

    saveProfiles(profiles);
    return profiles;
  } catch (error) {
    console.error("Eroare la citirea profilurilor:", error);
    return defaultProfiles;
  }
}

export function saveProfiles(profiles) {
  localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
}

export function getActiveProfileId() {
  return localStorage.getItem(ACTIVE_PROFILE_KEY);
}

export function setActiveProfileId(profileId) {
  localStorage.setItem(ACTIVE_PROFILE_KEY, profileId);
}

export function getActiveProfile() {
  const profiles = getProfiles();
  const activeId = getActiveProfileId();

  return profiles.find((profile) => profile.id === activeId) || null;
}

export function updateProfile(profileId, changes) {
  const profiles = getProfiles();

  const updatedProfiles = profiles.map((profile) =>
    profile.id === profileId
      ? { ...profile, ...changes }
      : profile
  );

  saveProfiles(updatedProfiles);
  return updatedProfiles;
}
