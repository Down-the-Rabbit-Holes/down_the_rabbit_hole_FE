import "./GamePlay.css";
import React, { useState } from "react";
import NavBar from "../nav_bar/nav_bar.component";
import star from "../../Icons/star.png";
import { useLocation } from "react-router-dom";

function GamePlay({ favorites, setFavorites }) {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [predatorData, setPredatorData] = useState([]);
  const [currentAnimal, setCurrentAnimal] = useState(location.state?.rabbitData || {});

  // console.log("currentAnimal data:", currentAnimal);

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

  const predatorOptions = predatorData.map((predator) => (
    <section className='predator-card'>
      <img
        key={predator.id}
        src={predator.attributes.photo_url}
        alt={`A ${predator.attributes.name}`}
        className="predator-image"
        data-cy="predator-image"
        onClick={() => handlePredatorClick(predator)}
      />
      <p>{predator.attributes.name}</p>
     </section>
  ))

  return (
    <section className="game-play-section" data-cy="GamePlay-section">
      < NavBar favorites={favorites}/>
      <h2 className="animal-name" data-cy="animal-name">{attributes.name.toUpperCase()}</h2>
      <div className="animal-container" data-cy="animal-container">
        <img 
          data-cy="animal-pic"  
          className="animal-pic" 
          src={attributes.photo_url} 
          alt={`A wild ${attributes.name}`} 
        />
        <section className="facts-section" data-cy="facts-section">
          <ul data-cy="facts-list" className="facts-list">
            <li data-cy="scientific-name-li">Scientific name: {attributes.scientific_name}</li>
            <li data-cy="diet-li" id="-diet-li">A {attributes.name}'s diet includes {attributes.prey}</li>
            <li data-cy="predators-li" id="predators-li">A {attributes.name}'s predators include {attributes.predators}</li>
            <li data-cy="habitat-li">A {attributes.name}'s habitat includes {attributes.habitat.toLowerCase()}</li>
            <li data-cy="top-speed-li">Top Speed: {attributes.top_speed}</li>
            <li data-cy="lifespan-li">Lifespan: {attributes.life_span}</li>
            <li data-cy="weight-li">Weight: {attributes.weight}</li>
            <li data-cy="fun-fact-li">Fun Fact: {attributes.fun_fact}</li>
          </ul>
        </section>
      </div>
      <section className='clickables'>
        <button className="eat-me-button" data-cy="eat-me-button" onClick={openModal}>Eat Me!</button>
        <img src={star} 
          className="favorite-button"
          alt="Add to favorites" 
          data-cy="add-to-favorites"
          onClick={handleAddToFavorites}
        />
      </section>
      {isModalOpen && (
        <div className="modal-overlay"  data-cy="modal-overlay" onClick={closeModal}>
          <div className="modal-content" data-cy="modal-content" onClick={e => e.stopPropagation()}>
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