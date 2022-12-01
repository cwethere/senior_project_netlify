import './App.css';
import Axios from 'axios';
import { useState } from "react";
import React from "react";
import ReactDOM from "react-dom";
import GenerateTableLapChart from "./GenerateTableLapChart";

function LapChart() {
    
    const [year, setYear] = useState();
    const [raceList, setRaceList] = useState([]);
    const [race, setRace] = useState("");
    const [driverList, setDriverList] = useState([]);
    const [driver, setDriver] = useState();
    const [positionList, setPositionList] = useState([]);
    const [tableList, setTableList] = useState([]);
    const [graphList, setGraphList] = useState([]);
    const [generate, setGenerate] = useState(false);

    const getRaces = (event) => {
        console.log(event.target.value);
        setYear(event.target.value);

        Axios.get(`https://senior-project.herokuapp.com/api/getRaces/${event.target.value}`).then((response) => {
            console.log(response.data);

            setRaceList(response.data);
            console.log(raceList);
        });
    }
    const getDrivers = (event) => {
        console.log(event.target.value);
        setRace(event.target.value);

        Axios.get(`https://senior-project.herokuapp.com/api/getDriversLapChart/${event.target.value}`).then((response) => {
            console.log(response.data);

            setDriverList(response.data);
            console.log(driverList);
        });
    }

    const getGenDriver = (event) => {
        setDriver(event.target.value);
    }

    const generateTable = (event) => {
        
        if (race != "" && driver !="") {
            Axios.get(`https://senior-project.herokuapp.com/api/generateLapChartTable/${race}/${driver}`).then((response) => {
                console.log(response.data);
    
                setTableList(response.data);
        });  
            Axios.get(`https://senior-project.herokuapp.com/api/generateLapChartGraph/${race}/${driver}`).then((response) => {
                console.log(response.data);
    
                setGraphList(response.data);
        });  
            Axios.get(`https://senior-project.herokuapp.com/api/generateLapChartPosition/${race}`).then((response) => {
                console.log(response.data);
    
                setPositionList(response.data);
        });
        setGenerate(false);
    }    
    }
    
    const generateGraph = () => {
        setGenerate(true);
    }

    return(
    <div>
    <br/>
    <div className='Generation'>
        <select class="season" id="seasonLapChart" default={""} onChange={getRaces}>
            <option value="" hidden></option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
        </select>
        <select className="race" id="raceSectors" defaultValue={""} onChange={getDrivers}>
                <option value="" hidden></option>
                {raceList.map((val) => {
                return(
                <option value={val.RaceID}>{val.RaceName}</option>
                )
                    })
                }
            </select>
        <select className="driver" id="driverSectors" defaultValue={""} onChange={getGenDriver}>
            <option value="" hidden></option>        
            {driverList.map((val) => {
            return(
                <option value={val.DriverID}>{val.DriverName}</option>
                )
                })
            }        
            </select>    
            <br/>
            <br/>
            <button onClick={generateTable}>Generate Data</button>
        </div>
    <br/>
    <br/>
    <div id="results">
        <div id="table">
        <table className="genTable">
            <tbody>
                <tr>
                    <th>Lap</th>
                {tableList.map((val,index) => {
                    return(
                        <th>{val.LapID}</th>
                    )
                })
                }
                </tr>
                <tr>
                    <th>Position</th>
                {tableList.map((val,index) => {
                    return(
                        <td>{val.PosID}</td>
                    )
                    })
                }
                </tr>
            </tbody>
        </table>
        <br/>
        <button onClick={generateGraph}>Generate Graph</button>
        {generate && <GenerateTableLapChart dataPoints={graphList} positionIndex={positionList}/>}
        </div>
        </div>
    </div>
    )
}

export default LapChart;