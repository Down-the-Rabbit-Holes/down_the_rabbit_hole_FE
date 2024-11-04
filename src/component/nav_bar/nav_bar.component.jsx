import './nav_bar.css'

import { useNavigate } from 'react-router-dom';

const NavBar = ( {favorites} ) => {
  const navigate = useNavigate(); 

  const handleHomeLoad = () => {
    navigate("/")
  }

  const handleFavoritesLoad = () => {
    navigate("/favorites", { state: favorites });
  }
  
  return (

    <div className="navWapper">
      <nav className="navBar">
        <h1 data-cy="title" onClick={handleHomeLoad}>Down The Rabbit Hole</h1>
        <label data-cy="favorites-button" className="MySavedView" onClick={handleFavoritesLoad}>My Favorites</label>
      </nav>

    </div>
  );
};

export default NavBar;