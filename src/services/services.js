const BASE_URL = "https://fathomless-river-45488-66abd37a0e2d.herokuapp.com/api/v1";
// const BASE_URL = "http://localhost:3001/api/v1";

const fetchJSON = async (url, options = {}) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

export const fetchAllFavorites = async () => {
  try {
    const data = await fetchJSON(`${BASE_URL}/users/1/user_favorites`);
    return data.map((animal) => ({
      id: animal.id,
      name: animal.name,
      photo_url: animal.photo_url,
      fun_fact: animal.fun_fact,
    }));
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return null;
  }
};

export const removeFavorite = async (animalId) => {
  try {
    await fetchJSON(`${BASE_URL}/users/1/user_favorites/${animalId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return true;
  } catch (error) {
    console.error("Error removing from favorites:", error);
    throw error;
  }
};

export const getAnimalData = (id) =>
  fetchJSON(`${BASE_URL}/animals/${id}`);

export const getPredatorData = (id) =>
  fetchJSON(`${BASE_URL}/animals/${id}/predators`);

export const getPreyData = (id) =>
  fetchJSON(`${BASE_URL}/animals/${id}/prey`);

export const getYouTubeVideo = (animalName) =>
  fetchJSON(`${BASE_URL}/animals/videos?name=${animalName}`);

export const fetchParks = () => fetchJSON(`${BASE_URL}/parks`);

export const fetchAnimals = (parkId) => fetchJSON(`${BASE_URL}/park_animals/${parkId}`);

export const toggleFavorite = async (animalId, isFavorited) => {
  const url = `${BASE_URL}/users/1/user_favorites${isFavorited ? `/${animalId}` : ""}`;
  const method = isFavorited ? "DELETE" : "POST";
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: isFavorited ? null : JSON.stringify({ animal_id: animalId }),
  };
  return fetchJSON(url, options);
};