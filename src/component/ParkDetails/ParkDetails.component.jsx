import "./ParkDetails.css";
import NavBar from "../nav_bar/nav_bar.component";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ParkDetails = () => {
  const {state} = useLocation();
  const [park, setPark] = useState(state)
  const [animals, setAnimals] = useState({data: []});
  const navigate = useNavigate();

  useEffect(() => {
    console.log("ParkDetails - park", park);

    const fetchAnimals = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/v1/park_animals/${park.id}`);
        const data = await response.json();
        console.log("data", data);
        setAnimals(data);
      } catch (error) {
        console.error("Error fetching animals:", error);
      }
    };

    fetchAnimals();
  }, []);

  

  const handleAnimalClick = (animalId) => {
    navigate(`/game?animal_id=${animalId}`);
  };

  console.log("ParkDetails - animals", animals);

  return (
    <main className="park-details-main" data-cy="park-details-main">
      <NavBar isFavoritesClickable={true} />
        <div className="park-details-text" data-cy="park-details-text">
        <img
          className="parks-poster"
          data-cy="parks-poster"
          src={`/assets/parks_posters/${park.attributes.name
            .toLowerCase()
            .replace(/\s+/g, '_')}.jpeg`}
          alt={`${park.attributes.name} poster`}
         />
        <h1>{park.attributes.name}</h1>
        <h2>Location: {park.attributes.location}</h2>
        <h2>Annual Visitors: {park.attributes.annual_visitors}  </h2>
        <p>{park.attributes.description}</p>
      </div>
      <section className="park-animals-container" data-cy="park-animals-container">
        {animals.data.length > 0 ? (
          animals.data.map((animal) => (
            <div
              key={animal.id}
              className="animal-card"
              data-cy={`animal-card-${animal.id}`}
              onClick={() => handleAnimalClick(animal.id)}
            >
              <img
                src={animal.attributes.photo_url}
                alt={animal.attributes.name}
                className="animal-image"
              />
              <p className="animal-name">{animal.attributes.name}</p>
            </div>
          ))
        ) : (
          <p>Loading animals...</p>
        )}
      </section>

    </main>
  );
}

export default ParkDetails;