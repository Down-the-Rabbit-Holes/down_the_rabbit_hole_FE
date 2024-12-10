import "./Favorites.css";
import NavBar from "../../component/nav_bar/nav_bar.component";
import { useNavigate } from "react-router-dom";
import { removeFavorite } from "../../services/services";
import { useState } from "react";

const FavoritesView = ({ favorites, setFavorites }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleAnimalClick = (animalId) => {
    navigate(`/game?animal_id=${animalId}`);
  }

  const handleUnfavorite = async (animalId) => {
    try {
      await removeFavorite(animalId);
      setFavorites(favorites.filter((fav) => fav.id !== animalId));
    } catch (error) {
      console.error("Error removing from favorites:", error);
      setErrorMessage(error.message || "An error occurred while removing from favorites");
    }
  };

  return (
    <main data-cy="favorite-main" className="favorite-main">
      <NavBar isGamePage={true} isFavoritesClickable={true} />
      <div className="animal-list" data-cy="animal-list">
        <h2 data-cy="favorite-header" className="favorite-header">
          {favorites.length > 0 ? "My Favorites" : "No Favorites Yet"}
        </h2>
        <div className="favorite-list" data-cy="favorite-list">
          {favorites.map((animal, index) => (
            <div
              className="favorite-index"
              data-cy="favorite-index"
              key={index}
              onClick={() => handleAnimalClick(animal.id)}
              role="button"
              aria-label={`View details for ${animal.name}`}
              tabIndex="0"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleAnimalClick(animal.id);
                }
              }}
            >
              <div className="favorite-header-container"> 
                <h3
                  className="favorite-animal-name"
                  data-cy="favorite-animal-name"
                >
                  {animal.name}
                </h3>
                <label
                  className="favorites-love-heart"
                  htmlFor={`heart-${animal.id}`}
                  role="button"
                  aria-label={`Unfavorite ${animal.name}`}
                  tabIndex="0"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUnfavorite(animal.id);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.stopPropagation();
                      handleUnfavorite(animal.id);
                    }
                  }}
                >
                  <input
                    type="checkbox"
                    id={`heart-${animal.id}`}
                    checked={favorites.some((fav) => fav.id === animal.id)}
                    onChange={() => handleUnfavorite(animal.id)}
                    hidden
                  />
                </label>
              </div>
              <div className="image-container">
                <img
                  src={animal.photo_url}
                  alt={`A ${animal.name}`}
                  className="favorite-animal-pic"
                  data-cy="favorite-animal-pic"
          
                />
              </div>
              <div className="animal-info">
                Fun Fact: {animal.fun_fact}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default FavoritesView;
