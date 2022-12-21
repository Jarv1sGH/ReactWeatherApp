import React from 'react'
import { Icons } from '../icons';
import "./cards.css"

const HourlyCard = (props) => {
    const { hourWeather } = props;
    let symbol = hourWeather.symbol;
    let icon;
    let amOrPm;


   


    function extractTime(dateString) {
        const date = new Date(dateString);

        // Extract the hours, minutes, and seconds from the date object
        const hours = date.getHours();
        const minutes = date.getMinutes();
        if (hours >= 12) {
            amOrPm = "pm";
        }
        else {
            amOrPm = "am";
        }
        return `${hours}:${minutes}`;
    }
    const dateString = hourWeather.time; // Extracting the date&time from current weather data
    const time = extractTime(dateString);
    let windSpeed = Math.floor(hourWeather?.windSpeed * 3.6);

    let values = Icons(symbol,icon);
    icon = values[0];
    
    return (
        <> 
           <div  className='hourlyCards'>
                <h4> {time}{amOrPm}</h4>
                <h3>{hourWeather.temperature}°C</h3>
                <p>{icon} {hourWeather.symbolPhrase}</p>
                <p> <i style={{ "color": "pink" }} className="fa-solid fa-umbrella"></i> Rain {hourWeather.precipProb}%</p>
                <p><i style={{ "color": "maroon" }} className="fa-solid fa-wind"></i> Wind {windSpeed} km/h {hourWeather.windDirString} </p>
            </div>
        </>
    )
}

export default HourlyCard;