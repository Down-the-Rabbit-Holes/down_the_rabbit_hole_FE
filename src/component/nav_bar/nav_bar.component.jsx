import './nav_bar.css'
import star from '../../Icons/star.png'
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import Home from '../home/home.component';





const NavBar = () => {
  
  const navigate = useNavigate() 

  const handleHomeLoad = () => {
    navigate("/")
  }

  const handleFavoritesLoad = () => {
    navigate("/favorites")
  }
  
  

  return (
    <div className="navWapper">
      <nav className="navBar">
        <h1 onClick={() => handleHomeLoad()}>Down The Rabbit Hole</h1>
      </nav>
    </div>
  );
};

export default NavBar;