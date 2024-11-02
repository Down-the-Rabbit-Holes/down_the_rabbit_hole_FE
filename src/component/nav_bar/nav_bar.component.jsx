import './nav_bar.css'
import home from '../../Icons/home.png'
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";





const NavBar = () => {

  const navigate = useNavigate()
  useEffect(() => {
  }, [])

  return (

    <div className= "navWapper" data-cy="navWapper">
      <nav className = "navBar" data-cy="navBar">
        <h1 className = "title" data-cy="title">Down the rabbit hole</h1>
      </nav>  
    </div>
  );
};

export default NavBar;