import "./GamePlay.css";
import React, { useEffect, useState } from "react";
import NavBar from "../nav_bar/nav_bar.component";
import { useLocation } from "react-router-dom";

function GamePlay({ favorites, setFavorites, errorMessage }) {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [predatorData, setPredatorData] = useState([]);
  const [isFavorited, setIsFavorited] = useState(false);
  const [currentAnimal, setCurrentAnimal] = useState(location.state?.rabbitData);

  useEffect(() => {
    const attributes = currentAnimal?.data ? currentAnimal.data[0].attributes : currentAnimal?.attributes;

    const animalId = parseInt(currentAnimal.id) ? parseInt(currentAnimal.id) : parseInt(currentAnimal.data[0].id);
    console.log("Current animal", currentAnimal);
    console.log("Current animal ID:", animalId);
    setIsFavorited(favorites.some(animal => animal.id === animalId));
  }, [favorites, currentAnimal]);
  
  const handleToggleFavorite = async () => {
    if (!favorites) return;
    // const animalId = parseInt(currentAnimal.id);
    // const animalName = currentAnimal.attributes.name;

    const animalId = parseInt(currentAnimal?.data ? currentAnimal.data[0].id : currentAnimal.id);
    const animalName = currentAnimal?.data ? currentAnimal.data[0].attributes.name : currentAnimal.attributes.name;
    console.log("Animal ID:", animalId);
    console.log("Animal Name:", animalName);
    console.log("Current animal:", currentAnimal);

    if (isFavorited) {
      if (favorites.some((animal) => animal.id === animalId)) {
        try {
          const response = await fetch(
            // `http://localhost:3001/api/v1/users/1/user_favorites/${animalId}`,
            `https://fathomless-river-45488-66abd37a0e2d.herokuapp.com/favorites/${animalId}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            }
          );

          if (response.ok) {
            setIsFavorited(false);
            setFavorites((prevFavorites) =>
              prevFavorites.filter((animal) => animal.id !== animalId)
            );
          } else {
            console.log("Response was not ok:", await response.text());
          }
        } catch (error) {
          console.error("Error removing from favorites:", error);
        }
      }
    } else {
      if (!favorites.some((animal) => animal.id === animalId)) {
        try {
          const response = await fetch(
            // `http://localhost:3001/api/v1/users/1/user_favorites`,
            `https://fathomless-river-45488-66abd37a0e2d.herokuapp.com/user_favorites`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({ animal_id: animalId }),
            }
          );

          if (response.ok) {

            setIsFavorited(true);
            setFavorites((prevFavorites) => [
              ...prevFavorites,
              {
                id: animalId,
                name: animalName,
                photo_url: currentAnimal.attributes.photo_url,
              },
            ]);
          } else {
            console.log("Response was not ok:", await response.text());
          }
        } catch (error) {
          console.error("Error adding to favorites:", error);
        }
      }
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    fetchPredatorData();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  function fetchPredatorData() {
    const animalName = currentAnimal?.data
      ? currentAnimal.data[0].attributes.name
      : currentAnimal.attributes.name;
    fetch(
      `http://localhost:3001/api/v1/animals?action_type=eat_me&animal_name=${animalName}`
      // `https://fathomless-river-45488-66abd37a0e2d.herokuapp.com/api/v1/animals?action_type=eat_me&animal_name=${animalName}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Predator data in the fetch:", data.data[0]);
        setPredatorData([...data.data]);
      })
      .catch((error) => console.log("Error fetching rabbit data:", error));
  }


  console.log("current animal:", currentAnimal)

  const attributes = currentAnimal?.data
    ? currentAnimal.data[0].attributes
    : currentAnimal?.attributes;

  const handlePredatorClick = (predator) => {
    setCurrentAnimal({ attributes: predator.attributes, id: predator.id });
    closeModal();
    console.log("Selected predator data:", predator);
  };

  const predatorOptions = predatorData.map((predator) => (
    <section className="predator-card" key={predator.id}>
      <img
        src={predator.attributes.photo_url}
        alt={`A ${predator.attributes.name}`}
        className="predator-image"
        data-cy="predator-image"
        tabIndex="0"
        onClick={() => handlePredatorClick(predator)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handlePredatorClick(predator);
          }
        }}
      />
      <p>{predator.attributes.name}</p>
    </section>
  ));

  return (
    <section className="game-play-section" data-cy="GamePlay-section">
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <NavBar
        isGamePage={true}
        isFavoritesClickable={true}
        favorites={favorites}
      />
      <h2 className="animal-name" data-cy="animal-name">
        {attributes.name.toUpperCase()}
      </h2>
      <div className="animal-container" data-cy="animal-container">
        <img
          data-cy="animal-pic"
          className="animal-pic"
          src={attributes.photo_url}
          alt={`A wild ${attributes.name}`}
        />
        <section className="facts-section" data-cy="facts-section">
          <ul data-cy="facts-list" className="facts-list">
            <li data-cy="scientific-name-li">
              Scientific name: {attributes.scientific_name}
            </li>
            <li data-cy="diet-li" id="-diet-li">
              A {attributes.name}'s diet includes {attributes.prey}
            </li>
            <li data-cy="predators-li" id="predators-li">
              A {attributes.name}'s predators include {attributes.predators}
            </li>
            <li data-cy="habitat-li">
              A {attributes.name}'s habitat includes{" "}
              {attributes.habitat.toLowerCase()}
            </li>
            <li data-cy="top-speed-li">Top Speed: {attributes.top_speed}</li>
            <li data-cy="lifespan-li">Lifespan: {attributes.life_span}</li>
            <li data-cy="weight-li">Weight: {attributes.weight}</li>
            <li data-cy="fun-fact-li">Fun Fact: {attributes.fun_fact}</li>
          </ul>
        </section>
      </div>
      <section className='clickables'>
        <button
          className="eat-me-button"
          data-cy="eat-me-button"
          onClick={openModal}>Eat Me!</button>
        <div className="love">
          <input 
            id="switch" 
            type="checkbox"
            checked={isFavorited}
            onChange={handleToggleFavorite}
          />
          <label
            className="love-heart"
            htmlFor="switch"
            tabIndex="0"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleToggleFavorite();
              }
            }}>
            <i class="left"></i>
            <i class="right"></i>
            <i class="bottom"></i>
            <div class="round"></div>
          </label>
        </div>
      </section>

      {isModalOpen && (
        <div
          className="modal-overlay"
          data-cy="modal-overlay"
          onClick={closeModal}
        >
          <div
            className="modal-content"
            data-cy="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 data-cy="predators-header">Prey's Predators</h2>
            <div data-cy="predators-container" className="predators-container">
              {predatorOptions}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default GamePlay;
