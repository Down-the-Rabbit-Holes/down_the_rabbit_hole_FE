import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from "../component/home/home.component";
import GamePlay from '../component/GamePlay/GamePlay';
import FavoritesView from '../component/Favorites/Favorites.component';


function App() {
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/game" element={<GamePlay/>} />
        <Route path="/favorites" element={<FavoritesView/>} />
        <Route path="*" element={<h2>Cannot find anything under that route</h2>} />
      </Routes>
    </div>
  )
}
export default App;
