import './home.css';
import NavBar from '../../component/nav_bar/nav_bar.component';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";


const Home = () => {
  useEffect(() => {
  }, [])

  const navigate = useNavigate();

  const handleGameStart = () => {
    navigate("/game")
  }

  return (
    <main className='home-main' data-cy="home-main">
      <NavBar />
      <div>  
        <img className="game-start-image" data-cy="game-start-image"
          src="/assets/bunny.jpeg" alt="cute bunny" onClick={handleGameStart}/>
      </div>
      <p className='main-page-p' data-cy="home-page-instructions">
        Click the bunny to discover fascinating facts about them and the intricate food web they belong to!
      </p>
    </main>
  );
};

export default Home;