import "./home.css";
import NavBar from "../../component/nav_bar/nav_bar.component";
import { Link, Route, Routes } from "react-router-dom";
import ForwardIcon from '@mui/icons-material/Forward';
import ParkSelection from "../ParkSelection/ParkSelection.component";

function Home() {

  return (
    <main className="home-main" data-cy="home-main">
      <NavBar isFavoritesClickable={true} />
      <div className="rabbit-container">
        <Link to={"/park-selection"} element={<ParkSelection/>}>
          <img src="/assets/rabbit-drawing.png" alt="waving rabbit" className="rabbit-image"/>
          <p className="overlay-text">Welcome! <br></br> Click to journey down <br></br> the rabbit hole!</p>
        </Link>
      </div>
    </main>
  );
};

export default Home;