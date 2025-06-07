import "./nav_bar.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

function NavBar({ favorites, isFavoritesClickable, audio, setAudio }) {
  const navigate = useNavigate();
  const location = useLocation();
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
  const isHomePage = location.pathname === "/";

  // THESE NEED TO CHANGE TO BE LINKS AND NOT USENAVIGATE
  const handleHomeLoad = () => {
    navigate("/");
  };
  // THESE NEED TO CHANGE TO BE LINKS AND NOT USENAVIGATE
  const handleFavoritesLoad = () => {
    navigate("/favorites", { state: favorites });
  };

  function volumeToggle() {
    setAudio(!audio);
  }

  return (
    <div className="nav-wrapper" data-cy="nav-bar">
      <nav className="navBar">
        {isHomePage ? (
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
        {/* <img
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
        /> */}
        <div className='screen-right'>
          <FavoriteIcon 
            data-cy="favorites-button"
            className="favorites-button-icon"
            sx={{ transition: "transform 0.3s ease-in-out, filter 0.3s ease-in-out, color 0.3s ease-in-out" }}
            onClick={isFavoritesClickable ? handleFavoritesLoad : null}
            tabIndex={isFavoritesClickable ? "0" : null}
            role="link"
            aria-hidden="false"
            aria-label="Go to Favorites"
            onKeyDown={(e) => {
              if (isFavoritesClickable && (e.key === "Enter" || e.key === " ")) {
                handleFavoritesLoad();
              }
            }}
          />
          <TextFieldsIcon
            className="font-toggle-button"
            sx={{ transition: "transform 0.3s ease-in-out, filter 0.3s ease-in-out, color 0.3s ease-in-out" }}
            onClick={toggleFont}
            tabIndex="0"
            aria-hidden="false"
            data-cy="font-toggle-button"
            aria-label="Toggle Dyslexia Font"
            aria-pressed={document.body.classList.contains("dyslexia-font")}
            >
            {fontMode}
          </TextFieldsIcon>
          { audio ? 
            <VolumeOffIcon 
            className="volume-up"
            onClick={volumeToggle}
            sx={{ transition: "transform 0.3s ease-in-out, filter 0.3s ease-in-out, color 0.3s ease-in-out" }}
            /> :
            <VolumeUpIcon 
            className="volume-up"
            onClick={volumeToggle}
            aria-hidden="false"
            sx={{ transition: "transform 0.3s ease-in-out, filter 0.3s ease-in-out, color 0.3s ease-in-out" }}
            />
          }
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
