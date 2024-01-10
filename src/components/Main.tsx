import * as React from "react";
import ListGroup from 'react-bootstrap/ListGroup';
// import Alert from "react-bootstrap/Alert"

import "../styles/Main.css";

import CitySelector from "./CitySelector";
import WeatherModeSelector from "./WeatherModeSelector";

import SingleWeatherDataElem from "./SingleWeatherDataElem";
import MultiWeatherDataElem from "./MultiWeatherDataElem";

// import Countries from "./Countries";
// import Alerts from "./Alerts";

// class Main extends React.Component {
//     render() {
//         return (
//             <main>
//                 <Countries />
//             </main>
//         );
//     }
// }

// function Main() {
//     let alertText = <b>This is some text for alert</b>;

//     return (
//         <main>
//             <Alerts>
//                 <Alert variant={"danger"}>
//                     { alertText }
//                 </Alert>
//                 <Alert variant={"success"}>
//                     { alertText }
//                 </Alert>
//                 <Alert variant={"warning"}>
//                     { alertText }
//                 </Alert>
//             </Alerts>
//             <Countries />
//         </main>
// );
// }

function Main(props) {
    let alertText = <b>This is some text for alert</b>;

    return (
        <main>
            <CitySelector weatherHelper={props.weatherHelper} modeIndex={props.modeIndex} cityIndex={props.cityIndex} />
            <WeatherModeSelector weatherHelper={props.weatherHelper} modeIndex={props.modeIndex} cityIndex={props.cityIndex} />
            {props.modeIndex == 0 ?
                <SingleWeatherDataElem cityIndex={props.cityIndex} usedWeatherData={props.usedWeatherData} /> :
                <MultiWeatherDataElem cityIndex={props.cityIndex} usedWeatherData={props.usedWeatherData} />
            }
        </main>
);
}

export default Main;