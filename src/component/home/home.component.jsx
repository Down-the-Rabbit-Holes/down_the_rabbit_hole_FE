import "./home.css";
import { Link } from "react-router-dom";

function Home() {

  return (
    <main className="home-main" data-cy="home-main">
      <div className="rabbit-container">
        <Link to={"/park-selection"}
           data-cy="start-button"
           aria-label="Click here to journey down the rabbit hole"
           onKeyDown={(e) => {
             if (e.key === 'Enter' || e.key === ' ') {
               e.currentTarget.click();
             }
           }} 
        >
          <img src="/assets/rabbit-drawing.png" alt="waving rabbit" className="rabbit-image" useMap="#workmap"/>
            <p className="overlay-text"
            >Welcome! <br/> 
            Click here to journey<br/> 
            Down the Rabbit Hole!</p>
        </Link>
      </div>
    </main>
  );
};

export default Home;