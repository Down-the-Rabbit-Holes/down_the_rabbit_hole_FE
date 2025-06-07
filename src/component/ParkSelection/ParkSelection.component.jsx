import './ParkSelection.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ParkSelection() {
  const navigate = useNavigate();
  const [parks, setParks] = useState({data: []});

  useEffect(() => {
    const fetchParks = async () => {
      try {
        const response = await fetch(
          `https://fathomless-river-45488-66abd37a0e2d.herokuapp.com/api/v1/parks`,
          // "http://localhost:3001/api/v1/parks"
        );
        const data = await response.json();
        setParks(data);
      } catch (error) {
        console.error("Error fetching parks:", error);
      }
    };

    fetchParks();
  }, []);

  const handleParkClick = (parkId, data) => {
    navigate(`/park-details/${parkId}`, {state: data})
  };

  return (
    <main className='park-selection'>
        <div className='details-rabbit-container'>
          <img src="/assets/left-rabbit-drawing.png" alt="waving rabbit" className="details-rabbit-image"/>
          <p className="selection-page-p" data-cy="selection-page-instructions">
            Dive into the wonders of nature<br/> by selecting a park from the list.<br/>
            Each park unveils fascinating facts<br/> about its unique ecosystem,<br/>
            showcasing the diverse animals<br/> that call it home.
            <br/>
            <br/>
            Click on a park to start exploring!
          </p>
        </div>
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
                }}>
                  <img
                    className="parks-poster"
                    data-cy="parks-poster"
                    src={`/assets/parks_posters/${park.attributes.name
                      .toLowerCase()
                      .replace(/\s+/g, '_')}.jpeg`}
                      alt={`${park.attributes.name} poster`}
                      
                      />
                  <p className="park-poster-name">{park.attributes.name}</p>
              </div>
            ))
          ) : (
            <p>Loading parks...</p>
          )}
        </div>
    </main>

  );
}

export default ParkSelection;