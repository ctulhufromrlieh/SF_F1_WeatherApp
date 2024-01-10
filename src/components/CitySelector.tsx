import * as React from "react";
import ListGroup from 'react-bootstrap/ListGroup';

import "../styles/CitySelector.css";
import { CityData, WeatherHelper } from "../helpers/WeatherHelper";

function CitySelector (props) {
    // let [selectedCityIndex, setSelectedCityIndex] = React.useState(-1);
    const weatherHelper: WeatherHelper = props.weatherHelper;

    // const makeSelectHandler = (index: number) => {
    //     return (() => {
    //         weatherHelper.setCityIndex(index);
    //         // setSelectedCityIndex(index);
    //     })
    // };

    return (
        <>
            <h2>Выберите город:</h2>
            <ListGroup className="city-selector">
                { weatherHelper.cityDatas.map((cityData: CityData, index) => {
                    // return (
                    //     <React.Fragment key={index}>
                    //         {
                    //             selectedCityIndex == index ?
                    //             <ListGroup.Item onClick={makeSelectHandler(index)} active>
                    //                 {cityData.name}
                    //             </ListGroup.Item> :
                    //             <ListGroup.Item onClick={makeSelectHandler(index)}>
                    //             {cityData.name}
                    //             </ListGroup.Item>
                    //         }
                    //     </React.Fragment>
                    // );

                    // return (
                    //     <React.Fragment key={index}>
                    //         {
                    //             props.cityIndex == index ?
                    //             <ListGroup.Item onClick={() => {console.log("setCityIndex(" + index + ")"); console.log("props.cityIndex = " + props.cityIndex); weatherHelper.setCityIndex(index)}} active>
                    //                 {cityData.name}
                    //             </ListGroup.Item> :
                    //             <ListGroup.Item onClick={() => {console.log("setCityIndex(" + index + ")"); console.log("props.cityIndex = " + props.cityIndex); weatherHelper.setCityIndex(index)}}>
                    //             {cityData.name}
                    //             </ListGroup.Item>
                    //         }
                    //     </React.Fragment>
                    // );

                    return (
                        <React.Fragment key={index}>
                            {
                                props.cityIndex == index ?
                                <ListGroup.Item onClick={() => {weatherHelper.setCityIndex(index); weatherHelper.setUsedWeatherData(props.modeIndex, index); }} active>
                                    {cityData.name}
                                </ListGroup.Item> :
                                <ListGroup.Item onClick={() => {weatherHelper.setCityIndex(index); weatherHelper.setUsedWeatherData(props.modeIndex, index); }}>
                                    {cityData.name}
                                </ListGroup.Item>
                            }
                        </React.Fragment>
                    );
                }) }
            </ListGroup>
        </>
    );
}

export default CitySelector;