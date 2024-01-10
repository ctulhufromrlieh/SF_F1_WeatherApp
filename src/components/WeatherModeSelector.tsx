import * as React from "react";
import ListGroup from 'react-bootstrap/ListGroup';

import "../styles/WeatherModeSelector.css";
import { CityData, WeatherHelper } from "../helpers/WeatherHelper";

function WeatherModeSelector (props) {
    // let [selectedModeIndex, setSelectedModeIndex] = React.useState(0);
    // console.log(props);
    // console.log(props.modeIndex);
    const weatherHelper: WeatherHelper = props.weatherHelper;

    // const makeSelectHandler = (index: number) => {
    //     return (() => {
    //         setSelectedModeIndex(index);
    //     })
    // };

    const weatherModes = [
        "Прогноз на сегодня",
        "Прогноз на 5 дней",
    ]

    return (
        <>
            <h2>Выберите режим работы</h2>
            <ListGroup className="weather-mode-selector">
                { weatherModes.map((weatherMode: string, index) => {
                    return (
                        <React.Fragment key={index}>
                            {
                                props.modeIndex == index ?
                                <ListGroup.Item onClick={() => {weatherHelper.setModeIndex(index); weatherHelper.setUsedWeatherData(index, props.cityIndex); }} active>
                                    {weatherMode}
                                </ListGroup.Item> :
                                <ListGroup.Item onClick={() => {weatherHelper.setModeIndex(index); weatherHelper.setUsedWeatherData(index, props.cityIndex); }}>
                                    {weatherMode}
                                </ListGroup.Item>
                            }
                        </React.Fragment>
                    );
                }) }
            </ListGroup>
        </>
    );

}

export default WeatherModeSelector;