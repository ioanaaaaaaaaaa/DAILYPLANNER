
import { getActiveProfileId } from "./profiles";

const OLD_STORAGE_KEY = "daily-planner-activities";

function getStorageKey(profileId) {
  return `daily-planner-activities-${profileId}`;
}

export function getActivities() {
  try {
    const profileId = getActiveProfileId();

    if (!profileId) return [];

    const storageKey = getStorageKey(profileId);
    const savedActivities = localStorage.getItem(storageKey);

    // Păstrăm activitățile existente în profilul Emmei.
    if (savedActivities === null && profileId === "emma") {
      const oldActivities = localStorage.getItem(OLD_STORAGE_KEY);

      if (oldActivities !== null) {
        localStorage.setItem(storageKey, oldActivities);
        return JSON.parse(oldActivities);
      }
    }

    return savedActivities ? JSON.parse(savedActivities) : [];
  } catch (error) {
    console.error("Eroare la citirea activităților:", error);
    return [];
  }
}

export function saveActivities(activities) {
  const profileId = getActiveProfileId();

  if (!profileId) return;

  const storageKey = getStorageKey(profileId);

  localStorage.setItem(storageKey, JSON.stringify(activities));
}
