import './nav_bar.css'

import {useEffect} from "react";


const NavBar = () => {
  useEffect (()=>{
  },[])

  return (
    <div className= "navWapper" data-cy="navWapper">
      <nav className = "navBar" data-cy="navBar">
        <h1 className = "title" data-cy="title">Down the rabbit hole</h1>
      </nav>  
    </div>
  );
};

export default NavBar ;