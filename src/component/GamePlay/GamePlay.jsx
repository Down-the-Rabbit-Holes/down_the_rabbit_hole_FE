import "./GamePlay.css";

function GamePlay({animal}) {

  return (
    <section className="GamePlay">
      <div className="game-container">
        <h2 className="game-animal-name">{animal.name}</h2>
        <img className="game-animal-pic" src={animal.photo_url} alt={`A wild ${animal.name}`} />
      </div>
    </section>
  );
}

export default GamePlay;