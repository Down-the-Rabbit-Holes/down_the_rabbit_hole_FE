import "./nav_bar.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const NavBar = ({ favorites, isGamePage, isFavoritesClickable }) => {
  const navigate = useNavigate();
  const [fontMode, setFontMode] = useState("Dyslexic Font");

  const toggleFont = () => {
    const body = document.body;
    if (body.classList.contains("default-font")) {
      body.classList.remove("default-font");
      body.classList.add("dyslexia-font");
      setFontMode("Default Font");
    } else {
      body.classList.remove("dyslexia-font");
      body.classList.add("default-font");
      setFontMode("Dyslexia Font");
    }
  };

  const handleHomeLoad = () => {
    navigate("/");
  };

  const handleFavoritesLoad = () => {
    navigate("/favorites", { state: favorites });
  };

  return (
    <div className="nav-wrapper" data-cy="nav-bar">
      <nav className="navBar">
        {!isGamePage ? (
          <h1 className="nav-title" data-cy="title">
            Down The Rabbit Hole
          </h1>
        ) : (
          <h1
            className="nav-title-clickable"
            data-cy="title"
            tabIndex="0"
            role="link"
            aria-label="Navigate to Home"
            onClick={handleHomeLoad}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleHomeLoad();
              }
            }}
          >
            Down The Rabbit Hole
          </h1>
        )}
        <img
          data-cy="home-button"
          className="home-button-icon"
          src="/assets/home_icon.png"
          onClick={handleHomeLoad}
          tabIndex="0"
          role="link"
          aria-label="Go to Home"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleHomeLoad();
            }
          }}
        />

        <img
          data-cy="favorites-button"
          className="favorites-button-icon"
          src="/assets/white_heart.png"
          onClick={isFavoritesClickable ? handleFavoritesLoad : null}
          tabIndex={isFavoritesClickable ? "0" : null}
          role="link"
          aria-label="Go to Favorites"
          onKeyDown={(e) => {
            if (isFavoritesClickable && (e.key === "Enter" || e.key === " ")) {
              handleFavoritesLoad();
            }
          }}
        />
        <button
          className="font-toggle-button"
          onClick={toggleFont}
          tabIndex="0"
          data-cy="font-toggle-button"
          aria-label="Toggle Dyslexia Font"
          aria-pressed={document.body.classList.contains("dyslexia-font")}
        >
          {fontMode}
        </button>
      </nav>
    </div>
  );
};

export default NavBar;
