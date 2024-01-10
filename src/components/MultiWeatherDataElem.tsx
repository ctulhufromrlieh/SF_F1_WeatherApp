import * as React from "react";

// import { WeatherData } from "../helpers/WeatherHelper";
import WeatherDataElem from "./WeatherDataElem";

function MultiWeatherDataElem(props){
    let usedWeatherData = props.usedWeatherData;
    let datas = null;
    if (usedWeatherData){
        datas = usedWeatherData.datas;
    }
    let is_valid = Boolean(datas);

    return (
        <>
            { is_valid ?
                <>            
                    {
                        datas.map((data, index) => { return <WeatherDataElem key={index} cityIndex={props.cityIndex} weatherData={datas[index]} /> } )
                    }
                </> :
                 <p>Нет данных...</p>
            }
        </>
    );
}

export default MultiWeatherDataElem;