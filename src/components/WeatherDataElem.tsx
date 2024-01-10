import * as React from "react";

function WeatherDataElem(props){
    let wd = props.weatherData;
    // console.log(props);
    return (
        <>
            <h1>Город: {props.cityIndex}</h1>
            <h1>Погода за n-день:</h1>
            <h2>Температура: {wd.temp} °C</h2>
            <h3>  ощущается как {wd.temp_feels_like}</h3>
            <h2>Диапазон температур: {wd.temp_min}  °C - {wd.temp_min}  °C</h2>
            <h2>Влажность: {wd.humidity} %</h2>
        </>
    );
}

export default WeatherDataElem;