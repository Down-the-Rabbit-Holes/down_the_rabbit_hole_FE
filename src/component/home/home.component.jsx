import "./home.css";
import NavBar from "../../component/nav_bar/nav_bar.component";
import { Link } from "react-router-dom";

function Home() {

  return (
    <main className="home-main" data-cy="home-main">
      <NavBar isFavoritesClickable={true} />
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
          {/* <map name="workmap"> */}
            {/* <area shape="circle" coords="" target="" alt="" title="" href="/park-selection"/> */}
            {/* <area alt="Click to start the journey" title="Start your journey" href="/park-selection"
            coords="110,109,193,67,298,49,404,36,501,26,568,29,648,35,714,50,782,87,827,143,852,220,852,288,812,
            382,788,343,732,338,700,369,691,413,686,467,645,475,630,496,623,528,624,560,641,590,620,586,589,567,
            568,540,562,516,556,498,504,502,354,517,262,514,148,487,74,437,25,338,33,223,57,159" shape="poly"/>
          </map> */}
          <p className="overlay-text">Welcome! <br/> 
          Click here to journey<br/> 
          Down the Rabbit Hole!</p>
        </Link>
      </div>
    </main>
  );
};

export default Home;