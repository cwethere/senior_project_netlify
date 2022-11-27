import './App.css';

function LapChart() {
    return(
    <div>
        <select class="season" id="seasonLapChart">
            <option value="2022">2022</option>
            <option value="2021">2021</option>
        </select>
        <select class="race" id="raceLapChart">
            <option value="202217">Firestone Grand Prix of Monterey</option>
            <option value="202216">Grand Prix of Portland</option>
        </select>
    </div>
    )
}

export default LapChart;