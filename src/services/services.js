const BASE_URL = "https://fathomless-river-45488-66abd37a0e2d.herokuapp.com/api/v1";

export const fetchAllFavorites = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/users/1/user_favorites`
      // "http://localhost:3001/api/v1/users/1/user_favorites"
      );
    if (!response.ok) {
        throw new Error('Failed to fetch favorites data');
      }
    const data = await response.json();
    return data.map((animal) => ({
      id: animal.id,
      name: animal.name,
      photo_url: animal.photo_url,
      fun_fact: animal.fun_fact,
    }));
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return null;
  }
};

export  const removeFavorite = async (animalId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/users/1/user_favorites/${animalId}`,
      // `http://localhost:3001/api/v1/users/1/user_favorites/${animalId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || "Failed to unfavorite the animal.");
    }

    return true;
    } catch (error) {
    console.error("Error removing from favorites:", error);
    throw error;  
  }
};

