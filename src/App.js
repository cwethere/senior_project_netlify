import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom';
import Nav from './Nav.js';
import LapChart from './LapChart.js';
import Sectors from './Sectors.js';

function App() {
  return (
  <Router>        
    <div className="Navbar">
      <Nav />
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/lapchart" exact element={<LapChart/>} />
        <Route path="/sectors" exact element={<Sectors/>} />
      </Routes>
    </div>
  </Router>
  );
}
const Home = () => (
  <div className="App">
  <header className="App-header">
    <div className="InfoBody">
      <div className="InfoBox">
        <h2>Indycar Reference Website</h2>
        <p>You can use the buttons at the top of the website to navigate to the different pages
           that you can generate and draw tables and graphs.</p>
           <br/>
      </div>
    </div>
  </header>
</div>
)

export default App;
