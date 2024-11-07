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
    <div className="nav-wrapper">
      <nav className="navBar">
        <h1 data-cy="title" onClick={handleHomeLoad}>Down The Rabbit Hole</h1>
        <img data-cy="home-button" className="home-button-icon" src="/assets/home_icon.png" onClick={handleHomeLoad}/>
        <label data-cy="favorites-button" className="my-save-view" onClick={handleFavoritesLoad}>My Favorites</label>
        <img data-cy="favorites-button" className="favorites-button-icon" src="/assets/white_heart.png" onClick={handleFavoritesLoad}/>
      </nav>
    </div>
  );
};

export default NavBar;