import "./GamePlay.css";
import animalsData  from "../data/animal_data";
import animalImages  from "../data/animal_photos";
import NavBar from "../nav_bar/nav_bar.component";
import star from "../../Icons/star.png";

function GamePlay() {
  

  const preyData = animalsData.filter(animal => !animal.characteristics.predators.includes("none"));
  const currentPrey = preyData[0]

  const getPredators = (preyName) => {
    return animalsData.filter(animal => 
      animal.characteristics.prey.includes(preyName)
    )
  };
  console.log('getpredators: ', getPredators)

  return (
    <section className="GamePlay-section" data-cy="GamePlay-section">
      < NavBar />
      <div className="prey-container" data-cy="prey-container">
        <h2 className="prey-animal-name" data-cy="prey-animal-name">{currentPrey.name}</h2>
        <img data-cy="prey-animal-pic"  
          className="prey-animal-pic" 
          src={animalImages[0].imageUrl} 
          alt={`A wild ${currentPrey.name}`} />
        <section className="prey-facts-section" data-cy="prey-facts-section">
          <ul data-cy="prey-facts-list" className="prey-facts-list">
            <li id="prey-diet-li">A {currentPrey.name}'s diet includes {currentPrey.characteristics.prey}</li>
            <li id="preys-predators-li">A {currentPrey.name}'s predators include {currentPrey.characteristics.predators}</li>
          </ul>
        </section>
      </div>
      <button className="eat-me-button" data-cy="eat-me-button">Eat Me!</button>
      <img src={star} className="favorite-Button"alt="Add to favorites"/>
    </section>
  );
}

export default GamePlay;
{/* EVERYTHING BELOW HERE MIGHT NEED TO BE ENCAPED INTO A SUB COMPONENT OF THIS O
<div className="predator-container">
  {getPredators(currentPrey).map((predator, predIndex) => (
    <span key={predIndex} className="predator-options">
      {predator.name}
    </span>
  ))}
</div> */}