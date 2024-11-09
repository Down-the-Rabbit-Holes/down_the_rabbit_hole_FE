import "./home.css";
import NavBar from "../../component/nav_bar/nav_bar.component";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleGameStart = () => {
    navigate("/game?animal_name=rabbit");
  };

  return (
    <main className="home-main" data-cy="home-main">
      <NavBar isFavoritesClickable={true} />
      <div>
        <img
          className="game-start-image"
          data-cy="game-start-image"
          src="/assets/rabbit.jpg"
          alt="cute bunny"
          tabIndex="0"
          onClick={handleGameStart}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleGameStart();
            }
          }}
        />
      </div>
      <p className="main-page-p" data-cy="home-page-instructions">
        Click the bunny to discover fascinating facts about them and the
        intricate food web they belong to!
      </p>
    </main>
  );
};

export default Home;

// import "./home.css";
// import NavBar from "../../component/nav_bar/nav_bar.component";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";

// const Home = () => {
//   const [rabbitData, setRabbitData] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {}, []);

//   const handleGameStart = () => {
//     // navigate("/game")
//     fetchAnimalData();
//   }

//   function fetchAnimalData() {
//     fetch("https://fathomless-river-45488-66abd37a0e2d.herokuapp.com/api/v1/animals?action_type=start&name=rabbit", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         }
//       }
//     )
//     .then(response => response.json())
//     .then(data => {
//       setRabbitData(data);
//       console.log("rabbitData:", data);
//       navigate("/game", { state: { rabbitData: data } }); 
//     })
//     .catch(error => console.log("Error fetching rabbit data:", error));
//   }

//   return (
//     <main className="home-main" data-cy="home-main">
//       <NavBar isFavoritesClickable={true} />
//       {/* <section className='home-screen'> */}
//       <div>
//         <img
//           className="game-start-image"
//           data-cy="game-start-image"
//           src="/assets/rabbit.jpg"
//           alt="cute bunny"
//           tabIndex="0"
//           onClick={handleGameStart}
//           onKeyDown={(e) => {
//             if (e.key === "Enter" || e.key === " ") {
//               handleGameStart();
//             }
//           }}
//         />
//       </div>
//       <p className="main-page-p" data-cy="home-page-instructions">
//         Click the bunny to discover fascinating facts about them and the
//         intricate food web they belong to!
//       </p>
//       {/* </section> */}
//     </main>
//   );
// };

// export default Home;