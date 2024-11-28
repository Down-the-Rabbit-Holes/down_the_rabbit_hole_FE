import "./home.css";
import NavBar from "../../component/nav_bar/nav_bar.component";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [parks, setParks] = useState({data: []});

  useEffect(() => {
    const fetchParks = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/v1/parks");
        const data = await response.json();
        console.log("data", data);
        setParks(data);
      } catch (error) {
        console.error("Error fetching parks:", error);
      }
    };

    fetchParks();
  }, []);

  
  const handleParkClick = (parkId, data) => {
    // navigate(`/park-details/${parkId}`);
    navigate(`/park-details/${parkId}`, {state: data})
  };

  console.log("Home - parks", parks);

  return (
    <main className="home-main" data-cy="home-main">
      <NavBar isFavoritesClickable={true} />
      <div className="parks-container">
        {parks && parks.data.length > 0 ? (
          parks.data.map((park) => (
            <div
              key={park.id}
              className="park-item"
              onClick={() => {
                handleParkClick(park.id, park)}
              }
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
        Click a park to discover fascinating facts about it and the
        intricate food web it belongs to!
      </p>
    </main>
  );
};

export default Home;