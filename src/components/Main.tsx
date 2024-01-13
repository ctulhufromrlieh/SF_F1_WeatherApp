import * as React from "react";
import ListGroup from 'react-bootstrap/ListGroup';
// import Alert from "react-bootstrap/Alert"

import "../styles/Main.css";

import { CityData, WeatherHelper } from "../helpers/WeatherHelper";

import Selector from "./Selector";
// import CitySelector from "./CitySelector";
// import WeatherModeSelector from "./WeatherModeSelector";

import SingleWeatherDataElem from "./SingleWeatherDataElem";
import MultiWeatherDataElem from "./MultiWeatherDataElem";

function Main(props) {
    let weatherHelper: WeatherHelper = props.weatherHelper;
    // let alertText = <b>This is some text for alert</b>;

    // return (
    //     <main>
    //         <CitySelector weatherHelper={props.weatherHelper} modeIndex={props.modeIndex} cityIndex={props.cityIndex} />
    //         <WeatherModeSelector weatherHelper={props.weatherHelper} modeIndex={props.modeIndex} cityIndex={props.cityIndex} />
    //         <div className="weather-data-elem-container">
    //             {props.modeIndex == 0 ?
    //                 <SingleWeatherDataElem weatherHelper={props.weatherHelper} cityIndex={props.cityIndex} usedWeatherData={props.usedWeatherData} /> :
    //                 <MultiWeatherDataElem weatherHelper={props.weatherHelper} cityIndex={props.cityIndex} usedWeatherData={props.usedWeatherData} />
    //             }
    //         </div>
    //     </main>
    // );

    const modeNames = weatherHelper.getModeNames();
    const modeOnClickHandlers = weatherHelper.getModeOnClickHandlers(props.cityIndex);
    const cityNames = weatherHelper.getCityNames();
    const cityOnClickHandlers = weatherHelper.getCityOnClickHandlers(props.modeIndex);

    // console.log(modeNames);
    // console.log(modeOnClickHandlers);
    // console.log(cityNames);
    // console.log(cityOnClickHandlers);

    return (
        <main>
            <Selector names={cityNames} onClikHandlers={cityOnClickHandlers} selIndex={props.cityIndex} smallCaption={"Город"} largeCaption={"Выберите город"} />
            <Selector names={modeNames} onClikHandlers={modeOnClickHandlers} selIndex={props.modeIndex} smallCaption={"Режим"} largeCaption={"Выберите режим работы"} />
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