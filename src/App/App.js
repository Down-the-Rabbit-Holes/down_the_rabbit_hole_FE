import './App.css';
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from 'react';
import Home from "../component/home/home.component";
import GamePlay from '../component/GamePlay/GamePlay.component';
import FavoritesView from '../component/Favorites/Favorites.component';
import ParkDetails from '../component/ParkDetails/ParkDetails.component';
import { fetchAllFavorites } from '../services/services';

function App() {
  const [favorites, setFavorites] = useState([])
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {{}
    try {
      const favoritesArray = await fetchAllFavorites();
      setFavorites(favoritesArray);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      setErrorMessage(error.message || 'An error occurred while fetching favorites data');
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

