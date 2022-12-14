import './App.css';
import Axios from 'axios';
import { useState } from "react";
import React from "react";
import ReactDOM from "react-dom";
import GenerateTableSectors from "./GenerateTableSectors";

function Sectors() {

    const [year, setYear] = useState();
    const [raceList, setRaceList] = useState([]);
    const [race, setRace] = useState("");
    const [driverList, setDriverList] = useState([]);
    const [driver, setDriver] = useState();
    const [lapList, setLapList] = useState([]);
    const [tableInfo, setTableInfo] = useState([]);
    const [timeInfo, setTimeInfo] = useState([]);
    const [speedInfo, setSpeedInfo] = useState([]);
    const [lap,setLap] = useState();
    const [generate,setGenerate] = useState(false);


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

        Axios.get(`https://senior-project.herokuapp.com/api/getDrivers/${event.target.value}`).then((response) => {
            console.log(response.data);

            setDriverList(response.data);
            console.log(driverList);
        });
    }

    const getLaps = (event) => {
        console.log(event.target.value);
        setDriver(event.target.value);

        Axios.get(`https://senior-project.herokuapp.com/api/getLaps/${race}/${event.target.value}`).then((response) => {
            console.log(response.data);

            setLapList(response.data);
            console.log(lapList);
        });
    }

    const setGenLap = (event) => {
        console.log(event.target.value);
        setLap(event.target.value);
    }

    const generateTable = (event) => {
    if (race != "" && driver !="" && lap !="") {
        Axios.get(`https://senior-project.herokuapp.com/api/generateTable/${race}/${driver}/${lap}`).then((response) => {
            console.log(response.data);

            setTableInfo(response.data);
            console.log(tableInfo);
    });  
        Axios.get(`https://senior-project.herokuapp.com/api/generateTimeData/${race}/${driver}/${lap}`).then((response) => {
            console.log(response.data);

            setTimeInfo(response.data);
            console.log(timeInfo);
    });  
        Axios.get(`https://senior-project.herokuapp.com/api/generateSpeedData/${race}/${driver}/${lap}`).then((response) => {
            console.log(response.data);

            setSpeedInfo(response.data);
            console.log(speedInfo);
    });
    setGenerate(false);
}
}  

    const generateGraph = () => {
        setGenerate(true);
    }

    return(
    <div className='body'>
        <div className='Generation'>
            <select className="season" id="seasonSectors" defaultValue={""} onChange={getRaces}>
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
            <select className="driver" id="driverSectors" defaultValue={""} onChange={getLaps}>
                <option value="" hidden></option>        
            {driverList.map((val) => {
            return(
                <option value={val.DriverID}>{val.DriverName}</option>
                )
                })
            }        
            </select>
            <select className="lap" id="lapSectors" defaultValue={""} onChange={setGenLap}>
                <option value="" hidden></option>        
            {lapList.map((val) => {
            return(
                <option value={val.LapID}>{val.LapID}</option>
                )
                })
            }        
            </select>
            <br/>
            <br/>
            <button onClick={generateTable}>Generate Data</button>
        <br/>
        </div>
        <br/>
    <div id="results">
        <div id="table">
        <table className="genTable">
            <tbody>
                <tr>
                    <th>Section</th>
                {tableInfo.map((val,index) => {
                    return(
                        <th>{val.StintID}</th>
                    )
                })
                }
                </tr>
                <tr>
                    <th>Time (s)</th>
                {tableInfo.map((val,index) => {
                    return(
                        <td>{val.STime}</td>
                    )
                    })
                }
                </tr>
                <tr>
                    <th>Speed (MPH)</th>
                {tableInfo.map((val,index) => {
                    return(
                        <td>{val.SSpeed}</td>
                    )
                    })
                }
                </tr>
            </tbody>
        </table>
    <br/>
    <button onClick={generateGraph}>Generate Graph</button> 
        {generate && <GenerateTableSectors dataPoints={timeInfo}/>}
        {generate && <GenerateTableSectors dataPoints={speedInfo}/>}
        </div>
    </div>
</div>

    );
}

export default Sectors;