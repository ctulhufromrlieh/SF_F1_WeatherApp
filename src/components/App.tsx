import * as React from "react";

import "../styles/App.css";

import { CityData, WeatherHelper } from "../helpers/WeatherHelper";

import Header from "./Header";
import Main from "./Main";

function App() {
    const [modeIndex, setModeIndex] = React.useState(0);
    const [cityIndex, setCityIndex] = React.useState(-1);
    const [usedWeatherData, setUsedWeatherData] = React.useState(null);

    // const whSetCityIndex = (value) => {
    //     // console.log()
    //     setCityIndex(value);
    //     console.log(`whSetCityIndex: setCityIndex(${value})`);
    //     console.log("whSetCityIndex: cityIndex = " + cityIndex);
    // }

    // let weatherDataChangedFunc = () => {

    // };

    const weatherHelper = new WeatherHelper(setModeIndex, setCityIndex, setUsedWeatherData);

    return (
        <>
            <Header />
            <Main weatherHelper={weatherHelper} cityIndex={cityIndex} modeIndex={modeIndex} usedWeatherData={usedWeatherData} />
        </>
    );
}

export default App;