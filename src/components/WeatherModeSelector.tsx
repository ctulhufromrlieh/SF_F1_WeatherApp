import * as React from "react";
import ListGroup from 'react-bootstrap/ListGroup';

import "../styles/WeatherModeSelector.css";
import { CityData, WeatherHelper } from "../helpers/WeatherHelper";

function WeatherModeSelector (props) {
    let [selectedModeIndex, setSelectedModeIndex] = React.useState(0);
    // const weatherHelper: WeatherHelper = props.weatherHelper;

    const makeSelectHandler = (index: number) => {
        return (() => {
            setSelectedModeIndex(index);
        })
    };

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
                                selectedModeIndex == index ?
                                <ListGroup.Item onClick={makeSelectHandler(index)} active>
                                    {weatherMode}
                                </ListGroup.Item> :
                                <ListGroup.Item onClick={makeSelectHandler(index)}>
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