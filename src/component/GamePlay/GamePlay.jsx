import "./GamePlay.css";
import React, { useEffect, useState } from "react";
import NavBar from "../nav_bar/nav_bar.component";
import { useSearchParams } from "react-router-dom";

function normalizeAnimalData(animalData) {
  if (!animalData) return null;

  if (animalData.data) {
    return {
      id: animalData.data.id,
      attributes: animalData.data.attributes,
    };
  }

  return {
    id: animalData.id,
    attributes: animalData.attributes,
  };
}

function GamePlay({ favorites, setFavorites, errorMessage }) {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams, "HERE");
  const animalName = searchParams.get("animal_id");
  const [currentAnimal, setCurrentAnimal] = useState(null);
  const [isPredatorsModalOpen, setIsPredatorsModalOpen] = useState(false);
  const [isPreyModalOpen, setIsPreyModalOpen] = useState(false);
  const [isYTModalOpen, setIsYTModalOpen] = useState(false);
  const [predatorData, setPredatorData] = useState([]);
  const [preyData, setPreyData] = useState([]);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    fetchAnimalData(animalName);
  }, [animalName]);

  useEffect(() => {
    if (!currentAnimal) return;

    const animalId = parseInt(currentAnimal.id);

    setIsFavorited(favorites.some((animal) => animal.id === animalId));
  }, [favorites, currentAnimal]);

  function fetchAnimalData(id) {
    fetch(
      // `https://fathomless-river-45488-66abd37a0e2d.herokuapp.com/api/v1/animals?action_type=start&name=${name}`,
      // `http://localhost:3001/api/v1/animals/${id}`,
      `http://localhost:3001/api/v1/animals/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const normalizedData = normalizeAnimalData(data);
        setCurrentAnimal(normalizedData);
      })
      .catch((error) => console.error("Error fetching animal data:", error));
  }

  function fetchPredatorData() {
    // const animalName = currentAnimal?.attributes?.name;
    const id = currentAnimal?.id;
    fetch(
      // `https://fathomless-river-45488-66abd37a0e2d.herokuapp.com/api/v1/animals?action_type=eat_me&animal_name=${animalName}`
      `http://localhost:3001/api/v1/animals/${id}/relationships?predators=true`
    )
      .then((response) => response.json())
      .then((data) => {
        const predators = data.data.map((predator) =>
          normalizeAnimalData({ data: predator })
        );
        setPredatorData(predators);
      })
      .catch((error) => console.error("Error fetching predator data:", error));
  }

  function fetchPreyData() {
    const id = currentAnimal?.id;
    fetch(`http://localhost:3001/api/v1/animals/${id}/relationships?prey=true`)
      .then((response) => response.json())
      .then((data) => {
        const prey = data.data.map((prey) =>
          normalizeAnimalData({ data: prey })
        );
        setPreyData(prey);
      })
      .catch((error) => console.error("Error fetching predator data:", error));
  }

  const handleToggleFavorite = async () => {
    if (!favorites || !currentAnimal) return;

    const animalId = parseInt(currentAnimal.id);
    const animalName = currentAnimal.attributes.name;

    if (isFavorited) {
      try {
        const response = await fetch(
          `https://fathomless-river-45488-66abd37a0e2d.herokuapp.com/api/v1/users/1/user_favorites/${animalId}`,
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
          console.error("Response was not ok:", await response.text());
        }
      } catch (error) {
        console.error("Error removing from favorites:", error);
      }
    } else {
      try {
        const response = await fetch(
          "https://fathomless-river-45488-66abd37a0e2d.herokuapp.com/api/v1/users/1/user_favorites",
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
          console.error("Response was not ok:", await response.text());
        }
      } catch (error) {
        console.error("Error adding to favorites:", error);
      }
    }
  };

  const openPredatorModal = () => {
    setIsPredatorsModalOpen(true);
    fetchPredatorData();
  };

  const openPreyModal = () => {
    setIsPreyModalOpen(true);
    fetchPreyData();
  };

  const closeModal = () => {
    setIsPredatorsModalOpen(false);
    setIsPreyModalOpen(false);
    setPredatorData([]);
    setPreyData([]);
  };

  const handlePredatorClick = (predator) => {
    setCurrentAnimal(predator);
    closeModal();
    setSearchParams({ animal_id: predator.id });
    // setSearchParams({ animal_name: predator.attributes.name });
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

  const preyOptions = preyData.map((prey) => (
    <section className="predator-card" key={prey.id}>
      <img
        src={prey.attributes.photo_url}
        alt={`A ${prey.attributes.name}`}
        className="predator-image"
        data-cy="predator-image"
        tabIndex="0"
        onClick={() => handlePredatorClick(prey)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handlePredatorClick(prey);
          }
        }}
      />
      <p>{prey.attributes.name}</p>
    </section>
  ));

  const attributes = currentAnimal?.attributes;

  return (
    <section className="game-play-section" data-cy="GamePlay-section">
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <NavBar
        isGamePage={true}
        isFavoritesClickable={true}
        favorites={favorites}
      />
      {attributes ? (
        <>
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
                <li data-cy="diet-li">
                  A {attributes.name}'s diet includes {attributes.prey}
                </li>
                <li data-cy="predators-li">
                  A {attributes.name}'s predators include {attributes.predators}
                </li>
                <li data-cy="habitat-li">
                  A {attributes.name}'s habitat includes{" "}
                  {attributes.habitat
                    ? attributes.habitat.toLowerCase()
                    : "Unknown"}
                </li>
                <li data-cy="top-speed-li">
                  Top Speed: {attributes.top_speed}
                </li>
                <li data-cy="lifespan-li">Lifespan: {attributes.life_span}</li>
                <li data-cy="weight-li">Weight: {attributes.weight}</li>
                <li data-cy="fun-fact-li">Fun Fact: {attributes.fun_fact}</li>
              </ul>
            </section>
          </div>
          <section className="clickables">
            <button
              className="eat-me-button"
              data-cy="eat-me-button"
              onClick={openPreyModal}
            >
              Eat!
            </button>
            <button
              className="eat-me-button"
              data-cy="eat-me-button"
              onClick={openPredatorModal}
            >
              Eat Me!
            </button>
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
                }}
              >
                <i className="left"></i>
                <i className="right"></i>
                <i className="bottom"></i>
                <div className="round"></div>
              </label>
            </div>
          </section>

          {isPredatorsModalOpen && (
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
                <h2 data-cy="predators-header">
                  {attributes.name}'s Predators
                </h2>
                <div
                  data-cy="predators-container"
                  className="predators-container"
                >
                  {predatorOptions}
                </div>
              </div>
            </div>
          )}

          {isPreyModalOpen && (
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
                <h2 data-cy="predators-header">{attributes.name}'s Prey</h2>
                <div
                  data-cy="predators-container"
                  className="predators-container"
                >
                  {preyOptions}
                </div>
              </div>
            </div>
          )}

          {isYTModalOpen && (
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
                <h2 data-cy="YT-header">How to Draw {currentAnimal.name}</h2>
                <div
                  data-cy="YT-container"
                  className="YT-container"
                >
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
}

export default GamePlay;
