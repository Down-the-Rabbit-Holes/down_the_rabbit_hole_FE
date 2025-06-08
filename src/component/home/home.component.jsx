import "./home.css";

function Home() {

  return (
    <main className="home-main" data-cy="home-main">
      <div className="rabbit-container">
        <img src="/assets/rabbit-drawing.png" alt="waving rabbit" className="rabbit-image" />
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
      </div>
    </main>
  );
};

export default Home;