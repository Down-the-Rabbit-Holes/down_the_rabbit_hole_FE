import './nav_bar.css'
import home from '../../Icons/home.png'
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";





const NavBar = () => {

  const navigate = useNavigate()
  useEffect(() => {
  }, [])

  return (
    <div className="navWapper">
      <nav className="navBar">
        <h1 className="tital">Down the rabbit hole</h1>
        <button onClick= {()=> {
          navigate('/')
        }}
        className='home-button'
        aria-label='Go to Home'
      >
        <img className="hiButton"src={home} alt='Home icon'/>
      </button>
      </nav>

    </div>
  );
};

export default NavBar;