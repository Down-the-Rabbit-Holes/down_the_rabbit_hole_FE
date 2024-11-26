import "./home.css";
import NavBar from "../../component/nav_bar/nav_bar.component";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleGameStart = () => {
    console.log("HERE")
    navigate("/game?animal_id=7");
    // change to animal ID
  };

  return (
    <main className="home-main" data-cy="home-main">
      <NavBar isFavoritesClickable={true} />
      <div>
        <img
          className="game-start-image"
          data-cy="game-start-image"
          src="/assets/rabbit.jpg"
          alt="cute bunny"
          tabIndex="0"
          onClick={handleGameStart}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleGameStart();
            }
          }}
        />
      </div>
      <p className="main-page-p" data-cy="home-page-instructions">
        Click the bunny to discover fascinating facts about them and the
        intricate food web they belong to!
      </p>
    </main>
  );
};

export default Home;