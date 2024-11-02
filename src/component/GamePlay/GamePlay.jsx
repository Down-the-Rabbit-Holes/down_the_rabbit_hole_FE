import "./GamePlay.css";
import animalsData  from "../data/animal_data";
import animalImages  from "../data/animal_photos";
import NavBar from "../nav_bar/nav_bar.component";

function GamePlay() {

  const preyData = animalsData.filter(animal => !animal.characteristics.predators.includes("none", "humans"));
  const prey = preyData
  console.log(prey[0])

  const getPredators = (prey) => {
    return animalsData.filter(animal => 
      animal.characteristics.prey.includes(prey)
    )
  };
  console.log('getpredators: ', getPredators)

  return (
    <section className="GamePlay">
      <NavBar />
      <div className="prey-container">
        <h2 className="prey-animal-name">{prey.name}</h2>
        <img  
          className="prey-animal-pic" 
          src={animalImages[0]} 
          alt={`A wild ${preyData[0].name}`} />
      </div>
      <div className="predator-container">
        {getPredators(preyData.prey).map((predator, predIndex) => (
          <span key={predIndex} className="predator-options">
            {predator.name}
          </span>
        ))}
      </div>
    </section>
  );
}
{/* {animalsData.map((animalData, index) => (
  <span key={index} className="predator-buttons">
    {animalData[0].characteristics["predators"]}
  </span>
))} */}

export default GamePlay;