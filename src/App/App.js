import './App.css';
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from 'react';
import Home from "../component/home/home.component";
import GamePlay from '../component/GamePlay/GamePlay.component';
import FavoritesView from '../component/Favorites/Favorites.component';
import ParkDetails from '../component/ParkDetails/ParkDetails.component';

function App() {
  const [favorites, setFavorites] = useState([])
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchAllFavorites();
  }, []);

  const fetchAllFavorites = async () => {
    try {
      const response = await fetch('https://fathomless-river-45488-66abd37a0e2d.herokuapp.com/api/v1/users/1/user_favorites');
      if (response.ok) {
        const data = await response.json();
        const favoritesArray = Array.isArray(data) ? data : [];
        setFavorites(favoritesArray);
      } else {
        console.error('Response was not ok:', await response.text());
        setErrorMessage('Failed to fetch favorites data');
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
      setErrorMessage('An error occurred while fetching favorites data');
    }
  };

  return (
    <div>
      <Routes>
        <Route path="/" 
          element={<Home/>} />
        <Route path="/park-details/:park" 
          element={<ParkDetails favorites={favorites} setFavorites={setFavorites}/>} />
        <Route path="/game" 
          element={<GamePlay favorites={favorites} setFavorites={setFavorites}/>} />
        <Route path="/favorites" 
          element={<FavoritesView favorites={favorites} setFavorites={setFavorites}/>} />
        <Route path="*" element={<h2>Cannot find anything under that route</h2>} />
      </Routes>
    </div>
  )
}
export default App;

