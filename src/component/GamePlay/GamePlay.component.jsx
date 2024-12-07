import "./GamePlay.css";
import React, { useEffect, useState } from "react";
import NavBar from "../nav_bar/nav_bar.component";
import YTPlayer from "../YTPlayer/YTPlayer.jsx"
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
  const [ytVideoId, setYTVideoId] = useState(null);
  const [predatorData, setPredatorData] = useState([]);
  const [preyData, setPreyData] = useState([]);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  };

  if (isPredatorsModalOpen || isPreyModalOpen || isYTModalOpen) {
    document.addEventListener("keydown", handleKeyDown);
  }

  return () => {
    document.removeEventListener("keydown", handleKeyDown);
  };
}, [isPredatorsModalOpen, isPreyModalOpen, isYTModalOpen]);

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

  console.log("current animal: ", currentAnimal)
  console.log("current animal name: ", currentAnimal?.attributes?.name)

  const fetchYTVideo = () => {
    const animalName = currentAnimal?.attributes?.name;
    if (!animalName) {
      return console.error("Missing an animal name.");
    };
    
    fetch(`http://localhost:3001/api/v1/animals/videos?name=${animalName}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((videoData) => {
        if (videoData.error) {
          throw new Error(videoData.error);
        }
        setYTVideoId(videoData.video_id);
      })
      .catch((error) => {
        console.error("Error fetching YouTube video:", error);
      });
  };


  const handleToggleFavorite = async () => {
    if (!favorites || !currentAnimal) return;
  
    const animalId = parseInt(currentAnimal.id);
  
    try {
      if (isFavorited) {
    
        const response = await fetch(
          `http://localhost:3001/api/v1/users/1/user_favorites/${animalId}`,
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
          console.error("Unfavorite failed:", await response.text());
        }
      } else {
   
        const response = await fetch(
          "http://localhost:3001/api/v1/users/1/user_favorites",
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
          const animalData = await response.json();
          setIsFavorited(true);
          setFavorites((prevFavorites) => [...prevFavorites, animalData]);
        } else {
          console.error("Favorite failed:", await response.text());
        }
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
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

  const openYTModal = () => {
    setIsYTModalOpen(true);
    fetchYTVideo();
  }

  const closeModal = () => {
    setIsPredatorsModalOpen(false);
    setIsPreyModalOpen(false);
    setIsYTModalOpen(false);
    setPredatorData([]);
    setPreyData([]);
  };

  const handlePredatorClick = (predator) => {
    setCurrentAnimal(predator);
    closeModal();
    setSearchParams({ animal_id: predator.id });
    // setSearchParams({ animal_name: predator.attributes.name });
  };

  const predatorOptions = 
    predatorData.length > 0 ? (
      predatorData.map((predator) => (
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
          <p className="predator-name">{predator.attributes.name}</p>
        </section>
      ))
    ) : (
      <p className="apex-predator-message" data-cy="apex-predator-message">
        {`${currentAnimal?.attributes?.name} is an apex predator. That means it is at the top of the food chain and nothing hunts it.`}
      </p>
    );

  const preyOptions = 
    preyData.length > 0 ? (
      preyData.map((prey) => (
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
          <p className="prey-name">{prey.attributes.name}</p>
        </section>
      ))
    ) : (
      <p className="no-prey-message" data-cy="no-prey-message"> {currentAnimal?.attributes?.name}s does not hunt other animals for food. We will soon be adding information about plants, nectar, and other food sources so you can learn more about the diets of non-predatory animals.</p> 
  );

  const attributes = currentAnimal?.attributes;

  function playButtonAudio() {
    let audio = new Audio("/assets/audio/munch-sound-effect.mp3");
    audio.play();
  }

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
          <div className="animal-header">
            <h2 className="game-animal-name" data-cy="animal-name">
              {attributes.name.toUpperCase()}
            </h2>
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
          </div>
          <div className="animal-container" data-cy="animal-container">
            <img
              data-cy="animal-pic"
              className="animal-pic"
              src={attributes.photo_url}
              alt={`A wild ${attributes.name}`}
            />
            <section className="facts-section" data-cy="facts-section">
              <ul data-cy="facts-list" className="facts-list">
                <li data-cy="description"> {attributes.description}</li>
                <li data-cy="diet"> Diet: <strong>{attributes.diet}</strong></li>
                <li data-cy="scientific-name-li">
                  A baby {attributes.name} is called a <strong>{attributes.baby_name}</strong>
                </li>
                <li data-cy="group-name-li"> 
                  Group name: <strong>{attributes.group_name}</strong>
                </li>
                <li data-cy="habitat-li">
                  Habitat: <strong>
                    {attributes.habitat
                    ? attributes.habitat.toLowerCase()
                    : "Unknown"}</strong>
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
              onClick={() => {
                openPreyModal();
                playButtonAudio();
              }}
            >
              Eat!
            </button>
            <button
              className="eat-me-button"
              data-cy="eat-me-button"
              onClick={() => {
                openPredatorModal();
                playButtonAudio();
              }}
            >
              Eat Me!
            </button>
            <button
              className="draw-me-button"
              data-cy="how-to-draw-button"
              onClick={openYTModal}
              >
              Draw Me!
            </button>
          
            <div className="love">
              <input
                id="switch"
                type="checkbox"
                checked={isFavorited}
                onChange={handleToggleFavorite}
              />
            </div>
          </section>

          {isPredatorsModalOpen && (
            <div
              className="modal-overlay"
              data-cy="modal-overlay"
              onClick={closeModal}
              role="dialog"
              aria-labelledby="predators-header"
              aria-modal="true"
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
              role="dialog"
              aria-labelledby="prey-header"
              aria-modal="true"
            >
              <div
                className="modal-content"
                data-cy="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 data-cy="prey-header">{attributes.name}'s Prey</h2>
                <div
                  data-cy="prey-container"
                  className="prey-container"
                >
                  {preyOptions}
                </div>
              </div>
            </div>
          )}

          {isYTModalOpen && ytVideoId && (
            <div
              className="modal-overlay"
              data-cy="modal-overlay"
              
              onClick={closeModal}
            >
              <div
                className="modal-content"
                data-cy="modal-content"
                id="yt-content"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 data-cy="YT-header">How to Draw a {currentAnimal?.attributes?.name}</h2>
                <div
                  data-cy="YT-container"
                  className="YT-container"
                >
                <YTPlayer ytVideoId={ytVideoId} />
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
