import "./GamePlay.css";
import animalsData  from "../data/animal_data";
import animalImages  from "../data/animal_photos";
import NavBar from "../nav_bar/nav_bar.component";

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
    <section className="GamePlay">
      <NavBar />
      <div className="prey-container">
        <h2 className="prey-animal-name">{currentPrey.name}</h2>
        <img  
          className="prey-animal-pic" 
          src={animalImages[0].imageUrl} 
          alt={`A wild ${currentPrey.name}`} />
        <section className="prey-facts-section">
          <ul>
            <li>A {currentPrey.name}'s diet includes {currentPrey.characteristics.prey}</li>
            <li>A {currentPrey.name}'s predators include {currentPrey.characteristics.predators}</li>
          </ul>
        </section>
      </div>
      <button>Eat Me!</button>
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