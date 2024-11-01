import './nav_bar.css'
import homeIcon from'../../assets/home.png'
import {useEffect} from "react";


const NavBar = () => {
  useEffect (()=>{
  },[])

  return (
    <div className= "navWapper">
      <nav className = "navBar">
        <h1 className = "tital">Down the rabbit hole</h1>
        <button
        onClick= {()=> {
          navigate('/')
        }}
        className='home-button'
        aria-label='Go to Home'
      >
        <img
          src={homeIcon}
          alt='Home icon'
        />
      </button>
      </nav>
    </div>
  );
};

export default NavBar ;