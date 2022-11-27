import './App.css';
import Axios from 'axios';
import { useState } from "react";
import React from "react";

function Sectors() {

    const [year, setYear] = useState();
    const [raceList, setRaceList] = useState([]);
    const [race, setRace] = useState("");
    const [driverList, setDriverList] = useState([]);
    const [driver, setDriver] = useState();
    const [lapList, setLapList] = useState([]);
    const [tableInfo, setTableInfo] = useState([]);
    const [lap,setLap] = useState();


    const getRaces = (event) => {
        console.log(event.target.value);
        setYear(event.target.value);

        Axios.get(`http://localhost:3001/api/getRaces/${event.target.value}`).then((response) => {
            console.log(response.data);

            setRaceList(response.data);
            console.log(raceList);
        });

    }
    
    const getDrivers = (event) => {
        console.log(event.target.value);
        setRace(event.target.value);

        Axios.get(`http://localhost:3001/api/getDrivers/${event.target.value}`).then((response) => {
            console.log(response.data);

            setDriverList(response.data);
            console.log(driverList);
        });
    }

    const getLaps = (event) => {
        console.log(event.target.value);
        setDriver(event.target.value);

        Axios.get(`http://localhost:3001/api/getLaps/${race}/${event.target.value}`).then((response) => {
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
        Axios.get(`http://localhost:3001/api/generateTable/${race}/${driver}/${lap}`).then((response) => {
            console.log(response.data);

            setTableInfo(response.data);
            console.log(tableInfo);
    });
    
}

    return(
    <div>
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
            <button onClick={generateTable}>Click</button>
            
        <br/>
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
                <th>Time</th>
            {tableInfo.map((val,index) => {
                return(
                    <td>{val.STime}</td>
                )
                })
            }
            </tr>
            <tr>
                <th>Speed</th>
            {tableInfo.map((val,index) => {
                return(
                    <td>{val.SSpeed}</td>
                )
                })
            }
            </tr>
        </tbody>
    </table>
    </div>

    );
}

export default Sectors;