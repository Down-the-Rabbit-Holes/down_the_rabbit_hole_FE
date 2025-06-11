import "./ParkDetails.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function ParkDetails() {
  const { id } = useParams();
  const [park, setPark] = useState(null);
  const [animals, setAnimals] = useState({ data: [] });
  const navigate = useNavigate();
  
  const fetchParkData = async () => {
    try {
      const response = await fetch(
        `https://fathomless-river-45488-66abd37a0e2d.herokuapp.com/api/v1/parks/${id}`
      );
      const data = await response.json();
      setPark(data.data);
    } catch (error) {
      console.error("Error fetching animals:", error);
    }
  };

  const fetchAnimals = async () => {
    try {
      const response = await fetch(
        `https://fathomless-river-45488-66abd37a0e2d.herokuapp.com/api/v1/park_animals/${id}`
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
  
  useEffect(() => {
    fetchParkData();
    fetchAnimals();
  }, []);
  

  const handleAnimalClick = (animalId) => {
    navigate(`/game?animal_id=${animalId}`);
  };

  if (!park) {
    return (
      <div className="loading-container">
        <p className="loading-text">Loading park details...</p>
      </div>
    );
  }

  return (
    <main className="park-details-main" data-cy="park-details-main">
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
      <section className="park-details-info">
        <ul className="park-details-text">
          <li>{park.attributes.description}</li>
          <li className="bold-info">Location: {park.attributes.location}</li>
          <li className="bold-info">Annual Visitors: {park.attributes.annual_visitors}</li>
          <li className="spaced-info">Get ready to meet some of {park.attributes.name}’s amazing creatures!</li>
          <li>Click on any animal to dive into the fascinating food web
          and see how they connect to the world around them.</li>
        </ul>
        <div className="park-rabbit-container">
          <img src="/assets/rabbit-drawing.png" alt="waving rabbit" className="park-rabbit-image"/>
          <p className="park-overlay-text">
            Click on an animal!
          </p>
        </div>
      </section>
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
