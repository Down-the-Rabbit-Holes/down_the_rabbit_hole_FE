import "./ParkDetails.css";
import NavBar from "../nav_bar/nav_bar.component";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function ParkDetails() {
  const { state } = useLocation();
  const [park, setPark] = useState(state);
  const [animals, setAnimals] = useState({ data: [] });
  const navigate = useNavigate();

  useEffect(() => {
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

  return (
    <main className="park-details-main" data-cy="park-details-main">
      <NavBar isGamePage={true} isFavoritesClickable={true} />
      <div className="park-details-header" data-cy="park-details-details">
        <h1 className="park-name">{park.attributes.name}</h1>
        <img
          className="parks-details-photo"
          data-cy="parks-details-poster"
          src={`/assets/park_photos/${park.attributes.name
            .toLowerCase()
            .replace(/\s+/g, "_")}.jpg`}
            alt={`${park.attributes.name} poster`}
        />
      </div>
        <p className="park-details-text">
          {park.attributes.description} <br/>
          <b>Location: {park.attributes.location}</b>
          <b>Annual Visitors: {park.attributes.annual_visitors}</b> <br/>
          Get ready to meet some of {park.attributes.name}’s amazing creatures!
          Click on any animal to dive into the fascinating food web
          and see how they connect to the world around them.
        </p>
      <section
        className="park-animals-container"
        data-cy="park-animals-container"
      >
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
                // alt={animal.attributes.name}
                alt=""
                className="animal-image"
              />
              <p className="animal-name">{animal.attributes.name}</p>
            </div>
          ))
        ) : (
          <p className="parks-animals-message">
            {park.attributes.name}'s animals coming soon!
          </p>
        )}
      </section>
    </main>
  );
};

export default ParkDetails;
