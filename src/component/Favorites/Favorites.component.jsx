import "./Favorites.css";
import NavBar from "../../component/nav_bar/nav_bar.component";
// import { useSearchParams } from "react-router-dom";

const FavoritesView = ({ favorites }) => {
  console.log("Favorites data:", favorites);

  // const [searchParams, setSearchParams] = useSearchParams();
  // const animalName = searchParams.get("animal_name");

  // const handleReturnToGame = (animalName) => {
  //   console.log("return to game: ", handleReturnToGame)
  //   setSearchParams({ animal_name: animalName });
  // }
  return (
    <main data-cy="favorite-main" className="favorite-main">
      <NavBar isGamePage={true} isFavoritesClickable={true} />
      <div className="animal-list" data-cy="animal-list">
        <h2 data-cy="favorite-header" className="favorite-header">
          {favorites.length > 0 ? "My Favorites" : "No Favorites Yet"}
        </h2>
        <div className="favorite-list" data-cy="favorite-list">
          {favorites.map((animal, index) => {
            console.log(`Favorite animal at index ${index}:`, animal);
            return (
              <div
                className="favorite-index"
                data-cy="favorite-index"
                key={index}
              >
                <h3
                  className="favorite-animal-name"
                  data-cy="favorite-animal-name"
                >
                  {animal.name}
                </h3>
                <div className="image-container">
                <img
                  src={animal.photo_url}
                  alt={`A ${animal.name}`}
                  className="favorite-animal-pic"
                  data-cy="favorite-animal-pic"
                  // onClick={ () => {handleReturnToGame(animalName)}}
                />
                </div>
                <div className="animal-info">
                  Fun Fact: {animal.fun_fact}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default FavoritesView;
