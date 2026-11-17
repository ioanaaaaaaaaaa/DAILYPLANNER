
const STORAGE_KEY = "daily-planner-activities";

export function getActivities() {
  try {
    const savedActivities = localStorage.getItem(STORAGE_KEY);
    return savedActivities ? JSON.parse(savedActivities) : [];
  } catch (error) {
    console.error("Eroare la citirea activităților:", error);
    return [];
  }
}

export function saveActivities(activities) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
}
