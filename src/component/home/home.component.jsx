import './home.css'
import Nav_bar from '../../component/nav_bar/nav_bar.component'
import {useEffect} from "react";

const Home = () => {
  useEffect (()=>{
  },[])

  return (
    <main>
      <Nav_bar/>
      <div>
        Hello World !!!
      </div>
      <div>  
        <img src="/assets/cute-bunny.webp" alt="cute bunny" />
      </div>
    </main>
  );
};

export default Home ;