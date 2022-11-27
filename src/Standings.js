import './App.css';

function Standings() {
    return(
    <div>
        <select class="season" id="seasonStandings">
            <option value="2022">2022</option>
            <option value="2021">2021</option>
        </select>
        <div class="results" id="standingsResults">
            <p>standings will output here</p>
        </div>
    </div>
    )
}

export default Standings;