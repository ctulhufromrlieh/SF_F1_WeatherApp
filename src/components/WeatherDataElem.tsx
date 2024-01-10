import * as React from "react";
import { WeatherHelper } from "../helpers/WeatherHelper";

function WeatherDataElem(props){
    const weatherHelper: WeatherHelper = props.weatherHelper;
    let wd = props.weatherData;
    let dt = new Date(wd.dt * 1000);
    // let dt = wd.dt;
    console.log(wd.dt);
    console.log(dt);
    // console.log(dt.getMonth());
    // console.log(dt.getDate());

    const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь", ];

    // console.log(props);
    return (
        <>
            <h1>Город: {weatherHelper.getCityDataByIndex(props.cityIndex).name}</h1>
            <h1>{monthNames[dt.getMonth()]}, { dt.getDate() }</h1>
            <h1>Погода за n-день:</h1>
            <h2>Температура: {wd.temp} °C</h2>
            <h3>  ощущается как {wd.temp_feels_like}</h3>
            <h2>Диапазон температур: {wd.temp_min}  °C - {wd.temp_min}  °C</h2>
            <h2>Влажность: {wd.humidity} %</h2>
        </>
    );
}

export default WeatherDataElem;