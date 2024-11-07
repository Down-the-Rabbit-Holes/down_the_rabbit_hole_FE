import React, { useEffect, useState } from "react";
import "./GamePlay.css";
import NavBar from "../nav_bar/nav_bar.component";
import { useLocation } from "react-router-dom";

function GamePlay({ favorites, setFavorites }) {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [predatorData, setPredatorData] = useState([]);
  const [currentAnimal, setCurrentAnimal] = useState(location.state?.rabbitData);
  const [isFavorited, setIsFavorited] = useState(false);

  console.log("GamePlay mounted with favorites:", favorites);
  console.log("GamePlay mounted with favorites type:", typeof favorites, Array.isArray(favorites));

  useEffect(() => {
    fetchAllFavorites();
  }, []);
  
  useEffect(() => {
    console.log('Favorites updated to:', favorites);
  }, [favorites]);

  // useEffect(() => {
  //   if (currentAnimal && Array.isArray(favorites)) {
  //     const animalId = parseInt(currentAnimal.id);
  //     setIsFavorited(favorites.some(animal => animal.id === animalId));
  //   }
  // }, [currentAnimal, favorites]);
  
  const fetchAllFavorites = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/users/1/user_favorites');
      if (response.ok) {
        const data = await response.json();
        const favoritesArray = Array.isArray(data.data) ? data.data : [];
        setFavorites(favoritesArray); // Directly set the fetched favorites
      } else {
        console.error('Response was not ok:', await response.text());
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  }

  useEffect(() => {
    console.log("Favorites state after fetch:", favorites);
  }, [favorites]);

  const handleToggleFavorite = async () => {
    if (!favorites) return;

    const animalId = parseInt(currentAnimal.id);
    const animalName = currentAnimal.attributes.name;
  
    if (isFavorited) {
      if (favorites.some(animal => animal.id === animalId)) {
        try {
          const response = await fetch(`http://localhost:3001/api/v1/users/1/user_favorites/${animalId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              "Accept": "application/json"
            }
          });
  
          if (response.ok) {
            setIsFavorited(false);
            setFavorites(prevFavorites => prevFavorites.filter(animal => animal.id !== animalId));
          } else {
            console.log('Response was not ok:', await response.text());
          }
        } catch (error) {
          console.error('Error removing from favorites:', error);
        }
      }
    } else {
      if (!favorites.some(animal => animal.id === animalId)) {
        try {
          const response = await fetch(`http://localhost:3001/api/v1/users/1/user_favorites`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              "Accept": "application/json"
            },
            body: JSON.stringify({ animal_id: animalId })
          });
  
          if (response.ok) {
            setIsFavorited(true);
            setFavorites(prevFavorites => [
              ...prevFavorites,
              { id: animalId, name: animalName, photo_url: currentAnimal.attributes.photo_url }
            ]);
          } else {
            console.log('Response was not ok:', await response.text());
          }
        } catch (error) {
          console.error('Error adding to favorites:', error);
        }
      }
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    fetchPredatorData();
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  function fetchPredatorData() {
    const animalName = currentAnimal?.data ? currentAnimal.data[0].attributes.name : currentAnimal.attributes.name;
    fetch(`http://localhost:3001/api/v1/animals?action_type=eat_me&animal_name=${animalName}`)
      .then(response => response.json())
      .then(data => {
        console.log("Predator data in the fetch:", data.data[0]);
        setPredatorData([...data.data]);
      })
      .catch(error => console.log("Error fetching rabbit data:", error))

  };

  if (!currentAnimal) return <div>Loading...</div>;

  const attributes = currentAnimal?.data ? currentAnimal.data[0].attributes : currentAnimal?.attributes;

  const handlePredatorClick = (predator) => {
    setCurrentAnimal({ attributes: predator.attributes, id: predator.id });
    closeModal();
    console.log('Selected predator data:', predator);
  }

  return (
    <section className="GamePlay-section" data-cy="GamePlay-section">
      < NavBar favorites={favorites}/>
      <div className="animal-container" data-cy="animal-container">
        <h2 className="animal-name" data-cy="animal-name">{attributes.name}</h2>
        <img 
          data-cy="animal-pic"  
          className="animal-pic" 
          src={attributes.photo_url} 
          alt={`A wild ${attributes.name}`} 
        />
        <section className="facts-section" data-cy="facts-section">
          <ul data-cy="facts-list" className="facts-list">
            <li data-cy="diet-li" id="-diet-li">A {attributes.name}'s diet includes {attributes.prey}</li>
            <li data-cy="predators-li" id="predators-li">A {attributes.name}'s predators include {attributes.predators}</li>
          </ul>
        </section>
      </div>
      <button className="eat-me-button" data-cy="eat-me-button" onClick={openModal}>Eat Me!</button>

      <div class="love">
        <input 
          id="switch" 
          type="checkbox"
          checked={isFavorited}
          onClick={handleToggleFavorite}
        />
        <label 
          class="love-heart" for="switch">
          <i class="left"></i>
          <i class="right"></i>
          <i class="bottom"></i>
          <div class="round"></div>
        </label>
      </div>

      {isModalOpen && (
        <div className="modal-overlay"  data-cy="modal-overlay" onClick={closeModal}>
          <div className="modal-content" data-cy="modal-content" onClick={e => e.stopPropagation()}>
            <h2 data-cy="predators-header">Prey's Predators</h2>
            <div data-cy="predators-container" className="predators-container">
              
              {predatorData.map((predator) => (
                <img
                  key={predator.id}
                  src={predator.attributes.photo_url}
                  alt={`A ${predator.attributes.name}`}
                  className="predator-image"
                  data-cy="predator-image"
                  onClick={() => handlePredatorClick(predator)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default GamePlay;