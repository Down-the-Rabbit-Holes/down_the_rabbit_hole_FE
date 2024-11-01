import "./GamePlay.css";
import animalsData  from "../data/animal_data";
import animalImages  from "../data/animal_photos";
import NavBar from "../nav_bar/nav_bar.component";

function GamePlay({}) {
  
  const preyData = animalsData.filter(animal => !animal.characteristics.predators.includes("none", "humans"));

  const getPredators = (prey) => {
    return animalsData.filter(animal => 
      animal.characteristics.prey.includes(prey.name)
    )
  };

  return (
    <section className="GamePlay">
      <NavBar />
      <div className="game-container">
        <h2 className="game-animal-name">{preyData[0].name}</h2>
        <img  
          className="game-animal-pic" 
          src={animalImages[0]} 
          alt={`A wild ${preyData[0].name}`} />
      </div>
      <div className="predator-container">
        {animalsData.map((animalData, index) => (
          <span key={index} className="predator-buttons">
            {animalData[0].characteristics["predators"]}
          </span>
        ))}
      </div>
    </section>
  );
}

export default GamePlay;