import './nav_bar.css'

import { useNavigate } from 'react-router-dom';

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
        <label className="MySavedView" onClick={() => handleFavoritesLoad()}>My Favorite's</label>
      </nav>

    </div>
  );
};

export default NavBar;