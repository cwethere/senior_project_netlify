import './App.css';
import { Link } from 'react-router-dom';

function Nav() {
    return(
        <div>
            <div className="header">
                <div className="optionList">
                    <ul>
                        <Link to="/" className="option">Home</Link>
                        <Link to="/standings" className="option"><li>Standings</li></Link>
                        <Link to="/lapchart" className="option"><li>Lap Chart</li></Link>
                        <Link to="/sectors" className="option"><li>Sectors</li></Link>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Nav;