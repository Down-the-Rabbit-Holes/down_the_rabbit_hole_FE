import './home.css';
import NavBar from '../../component/nav_bar/nav_bar.component';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

const Home = () => {
  useEffect (()=>{
  },[])

  const navigate = useNavigate();

  const handleGameStart = () => {
    navigate("/game")
  }

  return (
    <main>
      <NavBar />
      <div>
        Hello World !!!
      </div>
      <div>  
        <img src="/assets/running_rabbit" alt="cute bunny" onClick={handleGameStart}/>
      </div>
    </main>
  );
};

export default Home ;