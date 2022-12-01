import './App.css';
import { Link } from 'react-router-dom';

function Nav() {
    return(
        <div>
            <div className="header">
                <div className="optionList">
                    <ul>
                        <Link to="/" className="option">Home</Link>
                        <Link to="/lapchart" className="optionItem"><li>Lap Chart</li></Link>
                        <Link to="/sectors" className="optionItem"><li>Sectors</li></Link>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Nav;