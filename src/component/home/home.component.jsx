import './home.css'
import Nav_bar from '../../component/nav_bar/nav_bar.component'
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
  }, [])

  return (
    <main>
      <Nav_bar />
      <div className='bunny-img'>
        <img src="/assets/bunny.jpeg" alt="cute bunny" />
      </div>
      <p className='main-page-p'>
        Click the bunny to discover fascinating facts about them and the intricate food web they belong to!
      </p>
    </main>
  );
};

export default Home;