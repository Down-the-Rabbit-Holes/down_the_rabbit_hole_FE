import './home.css';
import NavBar from '../../component/nav_bar/nav_bar.component';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";


const Home = () => {
  const [animal, setAnimal] = useState([]);
  useEffect(() => {
    // fetch("http://localhost:3001/api/v1/animals", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     "action_type": "start",
    //     "name": "rabbit"
    //   })
    // })
    // .then(response => response.json())
    // .then(rabbit_data => console.log(rabbit_data))
    // .catch(error => console.error(error));
  }, [])

  const navigate = useNavigate();

  const handleGameStart = () => {
    navigate("/game")
    fetchRabbit();
    console.log(animal, "animal")
  }

  function fetchRabbit() {
   const animalData = fetch("http://localhost:3001/api/v1/animals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "action_type": "start",
        "name": "rabbit"
      })
    })
    .then(response => response.json())
    .then(rabbit_data => setAnimal(rabbit_data))
    // .then(rabbit_data => console.log(rabbit_data))
    .catch(error => console.error(error));
    console.log("here",animalData)
  };

  return (
    <main className='home-main' data-cy="home-main">
      <NavBar />
      <div>  
        <img className="game-start-image" data-cy="game-start-image"
          src="/assets/bunny.jpeg" alt="cute bunny" onClick={ () => {handleGameStart()}}/>
      </div>
      <p className='main-page-p' data-cy="home-page-instructions">
        Click the bunny to discover fascinating facts about them and the intricate food web they belong to!
      </p>
    </main>
  );
};

export default Home;