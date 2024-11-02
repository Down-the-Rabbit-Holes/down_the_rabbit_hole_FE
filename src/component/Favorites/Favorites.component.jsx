import './Favorites.css';
import NavBar from '../../component/nav_bar/nav_bar.component';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";


const FavoritesView = () => {
  useEffect(() => {
  }, [])





  return (
    <main className='home-main'>
      <NavBar />
      <div>
        <label>HEllo world </label>
      </div>
    </main>
  );
};

export default FavoritesView;