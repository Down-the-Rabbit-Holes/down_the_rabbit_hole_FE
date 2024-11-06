import React, { useState } from "react";
import "./GamePlay.css";

import NavBar from "../nav_bar/nav_bar.component";
import star from "../../Icons/star.png";
import { useLocation } from "react-router-dom";

function GamePlay({ favorites, setFavorites }) {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [predatorData, setPredatorData] = useState([]);
  // const preyData = animalsData.filter(animal => !animal.characteristics.predators.includes("none"));
  // const [currentAnimal, setCurrentAnimal] = useState(preyData[0]);
  // const [currentAnimal, setCurrentAnimal] = useState(location.state?.rabbitData || null);
  const [currentAnimal, setCurrentAnimal] = useState(location.state?.rabbitData || {});

  console.log("currentAnimal data:", currentAnimal);

  const openModal = () => {
    setIsModalOpen(true);
    fetchPredatorData();
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const addToFavorites = (animal) => {
    setFavorites(favorites => [...favorites, animal]);
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
  console.log("Predator data:", predatorData);
  // const handleAddToFavorites = () => {
  //   if (!favorites.some(animal => animal.name === currentAnimal.name)) {
  //     addToFavorites({ ...currentAnimal, imageUrl: getCurrentImg() });
  //     alert(`${currentAnimal.name} added to favorites!`);
  //   } else {
  //     alert(`${currentAnimal.name} is already a favorite!`);
  //   }
  // };
  const handleAddToFavorites = () => {
    // const attributes = currentAnimal.data[0].attributes; 
    if (!favorites.some(animal => animal.name === attributes.name)) {
      addToFavorites(attributes);
      alert(`${attributes.name} added to favorites!`);
    } else {
      alert(`${attributes.name} is already a favorite!`);
    }
  };

  const attributes = currentAnimal?.data ? currentAnimal.data[0].attributes : currentAnimal?.attributes;

  const handlePredatorClick = (predator) => {
    // setCurrentAnimal(predator);
    setCurrentAnimal({ attributes: predator.attributes });
    closeModal();
    console.log('Selected predator data:', predator);
  }

  // const getCurrentImg = () => {
  //   if (currentAnimal.name.toLowerCase() === 'rabbit') {
  //     return animalImages[0].imageUrl;
  //   } else {
  //     const predatorPhoto = rabbitPredatorsPhotos.find(photo => 
  //       photo.name === currentAnimal.name.toLowerCase()
  //     );
  //     return predatorPhoto.imageUrl;
  //   }
  // }

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
      <img src={star} 
        className="favorite-Button"
        alt="Add to favorites" 
        data-cy="add-to-favorites"
        onClick={handleAddToFavorites}
      />

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