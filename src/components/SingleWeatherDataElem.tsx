import * as React from "react";

import WeatherDataElem from "./WeatherDataElem";


function SingleWeatherDataElem(props){
    let usedWeatherData = props.usedWeatherData;
    let data = null;
    if (usedWeatherData){
        data = usedWeatherData.data;
    }
    let is_valid = Boolean(data); 
    // console.log(data);
    // let is_valid = false;

    // console.log(props);
    return (
        <>
        { is_valid ?
            <WeatherDataElem weatherHelper={props.weatherHelper} cityIndex={props.cityIndex} weatherData={data} /> :
            <p>Нет данных...</p>
        }
        </>
    );
    // return (
    //     <WeatherDataElem cityIndex={props.cityIndex} weatherData={data} /> 
    // );
}

export default SingleWeatherDataElem;