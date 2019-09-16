import React from 'react'
import "./weather.css"
const weather = (props) => {
    return (
        <div className="container weather-container">
            <div className="cards">
                <h1 className="py-3">{props.city}</h1>
                <h5 className="py-4">
                    <i className={`wi ${props.weatherIcon} display-1`}></i>
                </h5>
                {props.temperature? <h1 className="py-2"> Current : {props.temperature}&deg;</h1> : null}
                {minMax(props.temp_min, props.temp_max)}
                <h4 className="py-3">{props.description.toUpperCase()}</h4>
            </div>
        </div>
    )
}
const minMax = (min, max) => {
   if(min && max){
    return (
        <h3>
            <span className="px-4">Min : {min}&deg;</span>
            <span className="px-4">Max : {max}&deg;</span>
        </h3>
    )
   }
}

export default weather
