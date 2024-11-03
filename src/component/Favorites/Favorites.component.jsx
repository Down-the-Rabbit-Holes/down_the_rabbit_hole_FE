import './Favorites.css';
import NavBar from '../../component/nav_bar/nav_bar.component';
import { useLocation } from 'react-router-dom';
import { useEffect } from "react";


const FavoritesView = ({ favorites }) => {
  const location = useLocation();
  const { state } = location;
  const stateFavorites = state;

  useEffect(() => {
    console.log('favorites: ', stateFavorites)
  }, [stateFavorites])


  return (
    <main data-cy="favorite-main" className='favorite-main'>
      <NavBar />
      <div className='animal-list' data-cy="animal-list">
        <h2 data-cy='favorite-header' className='favorite-header'>
          { stateFavorites.length > 0 ? "Your Bebehs" : "No bebehs"}
        </h2>
        <div className='favorite-list' data-cy='favorite-list'>
          {stateFavorites.map((animal, index) => (
            <div className='favorite-index' data-cy='favorite-index' key={index}>
              <h3 className='favorite-animal-name' data-cy='favorite-animal-name'>
                {animal.name}
              </h3>
              <img 
                src={animal.imageUrl}
                alt={`A ${animal.name}`} 
                className="favorite-animal-pic"
                data-cy='favorite-animal-pic'
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default FavoritesView;