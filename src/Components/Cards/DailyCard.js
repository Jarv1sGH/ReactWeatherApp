import React from 'react'
import { Icons } from '../icons';
import "./cards.css";
import sunRise from "./../../Images/icons/sunRise.png"
import sunSet from "./../../Images/icons/sunSet.png"
const DailyCard = (props) => {
    const { dailyForecast } = props;
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec",];
    let monthStr;
    let symbol = dailyForecast.symbol;
    let icon;
    function extractTime(dateString) {
        const date = new Date(dateString);

        // Extract the day and month
        const day = date.getDate();
        const month = date.getMonth();
        for (let i = 0; i < 12; i++) {
            if (month === i) {
                for (let j = 0; j <= months.length; j++) {
                    if (i === j) {
                        monthStr = months[j];
                    }
                }
            }
        }
        return `${day} ${monthStr}`;

    }
    const dateString = dailyForecast.date; // Extracting the date from daily forecast
    const date = extractTime(dateString);
    let values = Icons(symbol,icon);
    icon = values[0];
    return (
        <div className='dailyForecast'>
            <h3> {date}</h3>
            <h4>
                {dailyForecast.maxTemp}°
                <span>{dailyForecast.minTemp}°</span>
            </h4>
            <p> {icon} {dailyForecast.symbolPhrase}</p>
            <p>  <i style = {{"color": "pink"}} className="fa-solid fa-umbrella"></i> Rain {dailyForecast.precipProb}%</p>
            <p> <img src={sunRise} alt="icon" /> Sunrise {dailyForecast.sunrise?.slice(0,5)} AM</p>
            <p> <img src={sunSet} alt="icon" /> Sunset {dailyForecast.sunset?.slice(0,5)} PM</p>
        </div>
    )
}

export default DailyCard;