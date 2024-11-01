import './App.css';
import { Route,Routes} from "react-router-dom";
import  Home from '../routes/home.component'
import Mdetails from "../component/Mdetails/mdetails.component";

function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Home/>}>
        <Route path=":movieId" element={<Mdetails/>}/>
        <Route path="*" element={<h2>Cannot find anything under that route</h2>}/>
      </Route>
    </Routes>
  )
}
export default App;
