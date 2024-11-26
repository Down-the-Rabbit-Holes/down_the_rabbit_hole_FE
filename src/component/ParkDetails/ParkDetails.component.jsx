import "./ParkDetails.css";
import NavBar from "../nav_bar/nav_bar.component";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ParkDetails = ({ park }) => {
  const [animals, setAnimals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await fetch(`/api/v1/parks/${park.id}/animals`);
        const data = await response.json();
        setAnimals(data.animals);
      } catch (error) {
        console.error("Error fetching animals:", error);
      }
    };

    fetchAnimals();
  }, [park.id]);

  const handleAnimalClick = (animalId) => {
    navigate(`/game?animal_id=${animalId}`);
  };

  return (
    <main className="park-details-main" data-cy="park-details-main">
      <NavBar isFavoritesClickable={true} />
      <div>
        <img
          className="park-details-image"
          data-cy="park-details-image"
          src={`/assets/park_posters/${park.name}.jpg`}
          alt={`${park.name} poster`}
        />
      </div>
      <div className="park-details-text" data-cy="park-details-text">
        <h1>{park.name}</h1>
        <h2>Location: {park.location}</h2>
        <h2>Annual Visitors: {park.annual_visitors}  </h2>
        <p>{park.description}</p>
      </div>
      <section className="park-animals-container" data-cy="park-animals-container">
        {animals.length > 0 ? (
          animals.map((animal) => (
            <div
              key={animal.id}
              className="animal-card"
              data-cy={`animal-card-${animal.id}`}
              onClick={() => handleAnimalClick(animal.id)}
            >
              <img
                src={animal.image_url}
                alt={animal.name}
                className="animal-image"
              />
              <p className="animal-name">{animal.name}</p>
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