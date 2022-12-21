import './App.css';
import Navbar from './Components/Navbar/Navbar';
import  { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Weather from './Components/Weather/Weather';
import Home from './Components/Home/Home';

function App() {

  return (
   <>
   <Router>
    <Navbar/>
    <Routes>
      <Route exact path = "/" element = {<Home/>}></Route>
      <Route exact path = "/weather-search" element = {<Weather/>}></Route>
    </Routes>
   </Router>
   </>
  );
}

export default App;
