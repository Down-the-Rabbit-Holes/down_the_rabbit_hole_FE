import "./GamePlay.css";
import animalsData  from "../data/animal_data";
import animalImages  from "../data/animal_photos";

function GamePlay({}) {
  

  return (
    <section className="GamePlay">
      <div className="game-container">
        <h2 className="game-animal-name">{animalsData[0].name}</h2>
        <img className="game-animal-pic" src={animalImages[0]} alt={`A wild ${animalImages[0].name}`} />
      </div>
    </section>
  );
}

export default GamePlay;