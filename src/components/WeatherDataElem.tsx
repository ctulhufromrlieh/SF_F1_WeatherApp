import * as React from "react";
import { WeatherHelper } from "../helpers/WeatherHelper";

import "../styles/WeatherDataElem.css";
import "../styles/Common.css";

function WeatherDataElem(props){
    const weatherHelper: WeatherHelper = props.weatherHelper;
    let wd = props.weatherData;
    // let dt = new Date(wd.dt * 1000);
    let dt = new Date(wd.dt);
    // let dt = wd.dt;
    console.log(wd.dt);
    console.log(dt);
    // console.log(dt.getMonth());
    // console.log(dt.getDate());

    const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь", ];

    // console.log(props);
    return (
        <>
            <div className="weather-data-elem data-elem-large">
                <p><b>Город: {weatherHelper.getCityDataByIndex(props.cityIndex).name}</b></p>
                <p>{monthNames[dt.getMonth()]}, { dt.getDate() }</p>
                <p>Температура: {wd.temp} °C</p>
                <p>  ощущается как {wd.temp_feels_like} °C</p>
                <p>Диапазон: {wd.temp_min}  °C .. {wd.temp_min}  °C</p>
                <p>Влажность: {wd.humidity} %</p>
            </div>
            <div className="weather-data-elem data-elem-small">
                <p><b>{weatherHelper.getCityDataByIndex(props.cityIndex).name}</b></p>
                <p>{monthNames[dt.getMonth()]}, { dt.getDate() }</p>
                <p>t =  {wd.temp} °C</p>
                <p>  (t ~ {wd.temp_feels_like} °C)</p>
                <p>t1..t2 = {wd.temp_min}  °C .. {wd.temp_min}  °C</p>
                <p>H = {wd.humidity} %</p>
            </div>
        </>
    );
}

export default WeatherDataElem;