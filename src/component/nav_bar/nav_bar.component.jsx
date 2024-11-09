import './nav_bar.css'
import { useNavigate } from 'react-router-dom';

const NavBar = ({ favorites, isGamePage, isFavoritesClickable }) => {
  const navigate = useNavigate();

  const handleHomeLoad = () => {
    navigate("/");
  };

  const handleFavoritesLoad = () => {
    navigate("/favorites", { state: favorites });
  };

  return (
    <div className="nav-wrapper" data-cy="nav-bar">
      <nav className="navBar">
        <h1
          data-cy="title"
          tabIndex={isGamePage ? "0" : null}
          onClick={isGamePage ? handleHomeLoad : null}
          onKeyDown={(e) => {
            if (isGamePage && (e.key === "Enter" || e.key === " ")) {
              handleHomeLoad();
            }
          }}
        >
          Down The Rabbit Hole
        </h1>
        <img
          data-cy="home-button"
          className="home-button-icon"
          src="/assets/home_icon.png"
          onClick={handleHomeLoad}
          tabIndex="0"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleHomeLoad();
            }
          }}
        />
        <label
          data-cy="favorites-button"
          className="my-save-view"
          onClick={isFavoritesClickable ? handleFavoritesLoad : null}
          tabIndex={isFavoritesClickable ? "0" : null}
          onKeyDown={(e) => {
            if (isFavoritesClickable && (e.key === "Enter" || e.key === " ")) {
              handleFavoritesLoad();
            }
          }}
        >
          My Favorites
        </label>
        <img
          data-cy="favorites-button"
          className="favorites-button-icon"
          src="/assets/white_heart.png"
          onClick={isFavoritesClickable ? handleFavoritesLoad : null}
          tabIndex={isFavoritesClickable ? "0" : null}
          onKeyDown={(e) => {
            if (isFavoritesClickable && (e.key === "Enter" || e.key === " ")) {
              handleFavoritesLoad();
            }
          }}
        />
      </nav>
    </div>
  );
};

export default NavBar;
