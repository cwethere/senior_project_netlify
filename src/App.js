import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom';
import Nav from './Nav.js';
import Standings from './Standings.js';
import LapChart from './LapChart.js';
import Sectors from './Sectors.js';

function App() {
  return (
  <Router>        
    <div className="Navbar">
      <Nav />
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/standings" exact element={<Standings/>} />
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
    <img src={logo} className="App-logo" alt="logo" />
    <a
      className="App-link"
      href="https://reactjs.org"
      target="_blank"
      rel="noopener noreferrer"
    >
      Learn React
    </a>
  </header>
</div>
)

export default App;
