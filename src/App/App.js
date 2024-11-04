import './App.css';
import { Route, Routes } from "react-router-dom";
import { useState } from 'react';
import Home from "../component/home/home.component";
import GamePlay from '../component/GamePlay/GamePlay';
import FavoritesView from '../component/Favorites/Favorites.component';


function App() {
  const [favorites, setFavorites] = useState([])

  return (
    <div>
      <Routes>
        <Route path="/" 
          element={<Home/>} />
        <Route path="/game" 
          element={<GamePlay favorites={favorites} setFavorites={setFavorites}/>} />
        <Route path="/favorites" 
          element={<FavoritesView favorites={favorites}/>} />
        <Route path="*" element={<h2>Cannot find anything under that route</h2>} />
      </Routes>
    </div>
  )
}
export default App;
