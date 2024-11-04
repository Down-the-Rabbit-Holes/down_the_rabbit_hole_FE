import React, { useState } from "react";
import "./GamePlay.css";
import animalsData  from "../data/animal_data";
import animalImages  from "../data/animal_photos";
import rabbitPredators from "../data/rabbit_predators_data";
import rabbitPredatorsPhotos from "../data/rabbit_predators_photos";
import NavBar from "../nav_bar/nav_bar.component";
import star from "../../Icons/star.png";

function GamePlay({ favorites, setFavorites }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const preyData = animalsData.filter(animal => !animal.characteristics.predators.includes("none"));
  const [currentAnimal, setCurrentAnimal] = useState(preyData[0]);
  
  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const addToFavorites = (animal) => {
    setFavorites(prevFavorites => [...prevFavorites, animal]);
  }

  const handleAddToFavorites = () => {
    if (!favorites.some(animal => animal.name === currentAnimal.name)) {
      addToFavorites({ ...currentAnimal, imageUrl: getCurrentImg() });
      alert(`${currentAnimal.name} added to favorites!`);
    } else {
      alert(`${currentAnimal.name} is already a favorite!`);
    }
    console.log('clicked add to favorites', handleAddToFavorites());
  };

  const handlePredatorClick = (predator) => {
    setCurrentAnimal(predator);
    closeModal();
    console.log('Selected predator data:', predator);
  }

  const getCurrentImg = () => {
    if (currentAnimal.name.toLowerCase() === 'rabbit') {
      return animalImages[0].imageUrl;
    } else {
      const predatorPhoto = rabbitPredatorsPhotos.find(photo => 
        photo.name === currentAnimal.name.toLowerCase()
      );
      return predatorPhoto.imageUrl;
    }
  }

  return (
    <section className="GamePlay-section" data-cy="GamePlay-section">
      < NavBar favorites={favorites}/>
      <div className="animal-container" data-cy="animal-container">
        <h2 className="animal-name" data-cy="animal-name">{currentAnimal.name}</h2>
        <img 
          data-cy="animal-pic"  
          className="animal-pic" 
          src={getCurrentImg()} 
          alt={`A wild ${currentAnimal.name}`} 
        />
        <section className="facts-section" data-cy="facts-section">
          <ul data-cy="facts-list" className="facts-list">
            <li data-cy="diet-li" id="-diet-li">A {currentAnimal.name}'s diet includes {currentAnimal.characteristics.prey}</li>
            <li data-cy="predators-li" id="predators-li">A {currentAnimal.name}'s predators include {currentAnimal.characteristics.predators}</li>
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
              {rabbitPredatorsPhotos.map((predator, index) => (
                <img
                  key={index}
                  src={predator.imageUrl}
                  alt={`A ${predator.name}`}
                  className="predator-image"
                  data-cy="predator-image"
                  onClick={() => handlePredatorClick(rabbitPredators[index])}
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
