import './App.css';
import { Route,Routes} from "react-router-dom";
import Home from "../component/home/home.component";

function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Home/>}>
        <Route path="*" element={<h2>Cannot find anything under that route</h2>}/>
      </Route>
    </Routes>
  )
}
export default App;
