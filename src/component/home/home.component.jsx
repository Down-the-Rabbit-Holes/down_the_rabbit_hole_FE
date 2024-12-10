import "./home.css";
import NavBar from "../../component/nav_bar/nav_bar.component";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchParks } from "../../services/services";

const Home = () => {
  const navigate = useNavigate();
  const [parks, setParks] = useState({data: []});

  useEffect(() => {
    const getParks = async () => {
      try {
        const data = await fetchParks();
        setParks(data);
      } catch (error) {
        console.error("Error fetching parks:", error);
      }
    };

    getParks();
  }, []);
  
  const handleParkClick = (parkId, data) => {
    navigate(`/park-details/${parkId}`, {state: data})
  };

  return (
    <main className="home-main" data-cy="home-main">
      <NavBar isFavoritesClickable={true} />
      <div className="parks-container">
        {parks && parks.data.length > 0 ? (
          parks.data.map((park) => (
            <div
              key={park.id}
              className="park-item"
              tabIndex="0"
              onClick={() => {
                handleParkClick(park.id, park)}}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleParkClick(park.id, park);
                  }
                }}
            >
              <img
                className="parks-poster"
                data-cy="parks-poster"
                src={`/assets/parks_posters/${park.attributes.name
                  .toLowerCase()
                  .replace(/\s+/g, '_')}.jpeg`}
                alt={`${park.attributes.name} poster`}
                
              />
            </div>
          ))
        ) : (
          <p>Loading parks...</p>
        )}
      </div>
      <p className="main-page-p" data-cy="home-page-instructions">
      Welcome to Down the Rabbit Hole! Dive into the wonders of nature by selecting a park from our list. Each park page unveils fascinating facts about its unique ecosystem, showcasing the diverse animals that call it home.
      <br/>
      <br/>
      Click a park to start exploring!
      </p>
    </main>
  );
};

export default Home;