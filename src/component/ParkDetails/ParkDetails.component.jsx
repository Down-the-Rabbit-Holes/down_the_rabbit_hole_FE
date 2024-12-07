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
        const response = await fetch(
          `https://fathomless-river-45488-66abd37a0e2d.herokuapp.com/api/v1/park_animals/${park.id}`
          // `http://localhost:3001/api/v1/park_animals/${park.id}`
        );
        const data = await response.json();
        const sortedAnimals = {
          ...data,
          data: data.data.sort((a, b) => {
            const nameA = a.attributes.name.toLowerCase();
            const nameB = b.attributes.name.toLowerCase();
            return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
          }),
        };
        setAnimals(sortedAnimals);
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
      <NavBar isGamePage={true} isFavoritesClickable={true} />
      <div className="park-details-details" data-cy="park-details-details">
        <img
          className="parks-details-poster"
          data-cy="parks-details-poster"
          src={`/assets/parks_posters/${park.attributes.name
            .toLowerCase()
            .replace(/\s+/g, '_')}.jpeg`}
          alt={`${park.attributes.name} poster`}
        />
        <div className="parks-details-text">
          <h1 className="park-name">{park.attributes.name}</h1>
          <hr />
          <p className="park-description">{park.attributes.description}</p>
          <h2 className="park-location">Location: {park.attributes.location}</h2>
          <h2 className="park-annual-visitors">Annual Visitors: {park.attributes.annual_visitors}  </h2>
          <p className="instructions">Get ready to meet some of {park.attributes.name}’s amazing creatures! Click on any animal to dive into the fascinating food web and see how they connect to the world around them.</p>
        </div>
      </div>
      <section className="park-animals-container" data-cy="park-animals-container">
        {animals.data.length > 0 ? (
          animals.data.map((animal) => (
            <div
              key={animal.id}
              className="animal-card"
              data-cy={`animal-card-${animal.id}`}
              tabIndex="0"
              onClick={() => handleAnimalClick(animal.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleAnimalClick(animal.id);
                }
              }}
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
          <p className="parks-animals-message">{park.attributes.name}'s animals coming soon!</p>
        )}
      </section>

    </main>
  );
}

export default ParkDetails;