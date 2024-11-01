import './home.css'
import {useEffect} from "react";

const Home = () => {
  useEffect (()=>{
  },[])

  return (
    <main>
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