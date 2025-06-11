import './App.css';
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from 'react';
import NavBar from "../component/nav_bar/nav_bar.component";
import Home from "../component/home/home.component";
import GamePlay from '../component/GamePlay/GamePlay.component';
import FavoritesView from '../component/Favorites/Favorites.component';
import ParkDetails from '../component/ParkDetails/ParkDetails.component';
import ParkSelection from '../component/ParkSelection/ParkSelection.component';

function App() {
  const [favorites, setFavorites] = useState([])
  const [audio, setAudio] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchAllFavorites();
  }, []);

  function volumeToggle() {
    setAudio(!audio);
  }

  const fetchAllFavorites = async () => {
    try {
      const response = await fetch(
        "https://fathomless-river-45488-66abd37a0e2d.herokuapp.com/api/v1/users/1/user_favorites"
        // "http://localhost:3001/api/v1/users/1/user_favorites"
        );
      if (response.ok) {
        const data = await response.json();
        const favoritesArray = data.map((animal) => ({
          id: animal.id,
          name: animal.name,
          photo_url: animal.photo_url,
          fun_fact: animal.fun_fact,
        }));
        setFavorites(favoritesArray);
      } else {
        setErrorMessage('Failed to fetch favorites data');
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
      setErrorMessage('An error occurred while fetching favorites data');
    }
  };

  return (
    <div>
      <NavBar isHomePage={true} isFavoritesClickable={true} favorites={favorites} audio={audio} setAudio={setAudio} volumeToggle={volumeToggle}/>
      <Routes>
        <Route path="/" 
          element={<Home/>} />
        <Route path="/park-selection" 
          element={<ParkSelection/>} />
        <Route path="/park-details/:id" 
          element={<ParkDetails favorites={favorites} setFavorites={setFavorites}/>} />
        <Route path="/game" 
          element={<GamePlay favorites={favorites} setFavorites={setFavorites} audio={audio}/>} />
        <Route path="/favorites" 
          element={<FavoritesView favorites={favorites} setFavorites={setFavorites}/>} />
        <Route path="*" element={<h2>Cannot find anything under that route</h2>} />
      </Routes>
    </div>
  )
}
export default App;

