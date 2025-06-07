import "./home.css";
// import { Link } from "react-router-dom";

function Home() {

  return (
    <main className="home-main" data-cy="home-main">
      <div className="rabbit-container">
        {/* <Link to={"/park-selection"}
           data-cy="start-button"
           aria-label="Click here to journey down the rabbit hole"
           onKeyDown={(e) => {
             if (e.key === 'Enter' || e.key === ' ') {
               e.currentTarget.click();
             }
           }} 
        > */}
          <img src="/assets/rabbit-drawing.png" alt="waving rabbit" className="rabbit-image" useMap="#workmap"/>
            <a className="overlay-text"
            data-cy="start-button"
            href="/park-selection"
            aria-label="Click here to journey down the rabbit hole"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.currentTarget.click();
              }
            }} 
            >Welcome! <br/> 
            Click here to journey<br/> 
            Down the Rabbit Hole!</a>
        {/* </Link> */}
      </div>
    </main>
  );
};

export default Home;