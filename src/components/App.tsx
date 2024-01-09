import * as React from "react";

import "../styles/App.css";

import { CityData, WeatherHelper } from "../helpers/WeatherHelper";

import Header from "./Header";
import Main from "./Main";

function App() {
    const [countryIndex, setCountryIndex] = React.useState(-1);
    const [modeIndex, setModeIndex] = React.useState(-1);
    const [usedWeatherData, setUsedWeatherData] = React.useState(null);

    // let weatherDataChangedFunc = () => {

    // };

    const weatherHelper = new WeatherHelper(setUsedWeatherData);
    // console.log(weatherHelper);

    return (
        <>
            <Header />
            <Main  weatherHelper={weatherHelper} />
        </>
    );
}

export default App;