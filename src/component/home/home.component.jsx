import './home.css';
import NavBar from '../../component/nav_bar/nav_bar.component';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";


const Home = () => {
  const [rabbitData, setRabbitData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
  }, []);


  const handleGameStart = () => { 
    // navigate("/game")
    fetchAnimalData();
  }

  function fetchAnimalData() {
    fetch('http://localhost:3001/api/v1/animals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },

   body: JSON.stringify({
       "action_type": "start",
        "name": "rabbit"
      })
    })
    .then(response => response.json())
    .then(data => {
      setRabbitData(data);
      console.log("rabbitData:", rabbitData);
      navigate("/game", { state: { rabbitData: data } }); 
    })
    .catch(error => console.log("Error fetching rabbit data:", error));
  };
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