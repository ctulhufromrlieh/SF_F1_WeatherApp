import * as React from "react";
import ListGroup from 'react-bootstrap/ListGroup';
// import Alert from "react-bootstrap/Alert"

import "../styles/Main.css";

import CitySelector from "./CitySelector";
import WeatherModeSelector from "./WeatherModeSelector";

import SingleWeatherDataElem from "./SingleWeatherDataElem";
import MultiWeatherDataElem from "./MultiWeatherDataElem";

function Main(props) {
    let alertText = <b>This is some text for alert</b>;

    return (
        <main>
            <CitySelector weatherHelper={props.weatherHelper} modeIndex={props.modeIndex} cityIndex={props.cityIndex} />
            <WeatherModeSelector weatherHelper={props.weatherHelper} modeIndex={props.modeIndex} cityIndex={props.cityIndex} />
            <div className="weather-data-elem-container">
                {props.modeIndex == 0 ?
                    <SingleWeatherDataElem weatherHelper={props.weatherHelper} cityIndex={props.cityIndex} usedWeatherData={props.usedWeatherData} /> :
                    <MultiWeatherDataElem weatherHelper={props.weatherHelper} cityIndex={props.cityIndex} usedWeatherData={props.usedWeatherData} />
                }
            </div>
        </main>
);
}

export default Main;