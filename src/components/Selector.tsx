import * as React from "react";
import ListGroup from 'react-bootstrap/ListGroup';

import "../styles/Selector.css";
// import "../styles/Common.css";

// import { CityData, WeatherHelper } from "../helpers/WeatherHelper";

function CitySelector (props) {
    // const weatherHelper: WeatherHelper = props.weatherHelper;
    const names:Array<string> = props.names;
    const onClikHandlers: Array<React.MouseEventHandler> = props.onClikHandlers;

    // console.log(onClikHandlers);

    return (
        <>
            <div className="selector-elem-caption-small"><h2>{props.smallCaption}</h2></div>
            <div className="selector-elem-caption-large"><h2>{props.largeCaption}</h2></div>
            <ListGroup className="selector-elem">
                {/* { weatherHelper.cityDatas.map((cityData: CityData, index) => { */}
                { names.map((name: string, index) => {
                    return (
                        <React.Fragment key={index}>
                            {
                                props.selIndex == index ?
                                <ListGroup.Item onClick={onClikHandlers[index]} active>
                                    {name}
                                </ListGroup.Item> :
                                <ListGroup.Item onClick={onClikHandlers[index]}>
                                    {name}
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