import React, { useState } from "react";
import HourlyCard from "../Cards/HourlyCard"
import DailyCard from "../Cards/DailyCard";
import Loader from "../Loader/Loader";
import "./Weather.css"
import { Icons } from '../icons';
import { currentWeather, hourlyWeather, dailyWeather,uvIndexValue} from '../../Api';
const Search = () => {
    let apiKey = process.env.REACT_APP_FORECA_API_KEY;
    const [value, setValue] = useState("");
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [weather, setWeather] = useState({});
    const [hourWeather, setHourWeather] = useState(['']);
    const [dailyForecast, setDailyForecast] = useState(['']);
    const [hide, setHide] = useState(false);
    const [locationName, setLocationName] = useState('');
    let locationID;
    let weatherUrl;
    let hourlyUrl;
    let dailyUrl;
    let symbol = weather.symbol;
    let icon;
    let hourlyParams = "?alt=0&tempunit=C&windunit=MS&tz=Europe%2FLondon&periods=8&dataset=full&history=0";
    let dailyParams = "?alt=0&tempunit=C&windunit=MS&periods=8&dataset=full";

    const url = `https://foreca-weather.p.rapidapi.com/location/search/${value}`;
    const options = {
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'foreca-weather.p.rapidapi.com'
        }
    };
    const weatherOptions = {
        params: { alt: '0', tempunit: 'C', windunit: 'MS', tz: 'Europe/London', lang: 'en' },
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'foreca-weather.p.rapidapi.com'
        }
    };

    const handleOnChange = (event) => {
        setValue(event.target.value);
        if (value !== '') {
            fetch(url, options)
                .then(response => response.json())
                .then(response => {
                    setLocations(response.locations)
                })
        }
    }

    const clickHandler = (locations) => {
        setLoading(true);
        setHide(true);
        locationID = locations.id;
        weatherUrl = `https://foreca-weather.p.rapidapi.com/current/${locationID}`;
        hourlyUrl = `https://foreca-weather.p.rapidapi.com/forecast/hourly/${locationID}${hourlyParams}`;
        dailyUrl = `https://foreca-weather.p.rapidapi.com/forecast/daily/${locationID}${dailyParams}`;
        currentWeather(weatherUrl, weatherOptions, setWeather, setLoading);
        hourlyWeather(hourlyUrl, options, setHourWeather);
        dailyWeather(dailyUrl, options, setDailyForecast);
        setLocationName(locations.name + (", ") + locations.country);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setLoading(true);
            if (locations[0]) {
                setHide(true);
                locationID = locations[0].id;
                weatherUrl = `https://foreca-weather.p.rapidapi.com/current/${locationID}`;
                hourlyUrl = `https://foreca-weather.p.rapidapi.com/forecast/hourly/${locationID}${hourlyParams}`;
                dailyUrl = `https://foreca-weather.p.rapidapi.com/forecast/daily/${locationID}${dailyParams}`;
                currentWeather(weatherUrl, weatherOptions, setWeather, setLoading);
                hourlyWeather(hourlyUrl, options, setHourWeather);
                dailyWeather(dailyUrl, options, setDailyForecast);
                setLocationName(locations[0].name + (", ") + locations[0].country);
            }

        }
    }

    // Extracting Time 
    let minutes;
    let hours;
    function extractTime(dateString) {
        const date = new Date(dateString);

        // Extract the hours, minutes, and seconds from the date object
        hours = date.getHours();
        minutes = date.getMinutes();
        return `${hours}:${minutes}`;
    }
    const dateString = weather.time; // Extracting the date&time from current weather data
    const time = extractTime(dateString);


    let className;
    let values = Icons(symbol,icon,className);
    icon = values[0];
    className = values[1];

    let uvIndexStr;
    uvIndexStr = uvIndexValue(uvIndexStr, weather);

    // Converting to km/h becasue for some reason api doesn't want to return speed in km/h or mph, even if the windUnit params is provided with km/h :/
    let windSpeed = Math.floor(weather?.windSpeed * 3.6);

    return (
        <>
            {!hide && <div className='searchContainer'>
                <div className="search-inner">
                    <h2>Search Your City</h2>
                    <div role="search" className="search-form" >
                        <input className="search-input"
                            type="text"
                            placeholder="Search"
                            value={value}
                            onChange={handleOnChange}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    <div className="suggestions">
                        <ul>
                            {locations && locations.slice(0, 10).map((locations) => (
                                <li onClick={() => clickHandler(locations)} key={locations.id}>{locations.name}, {locations.country}</li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>}

            {hide && <div>
                {loading ? <Loader /> :
                    <div className={className}>
                        <div className="currentWeather">
                            <div className="location">
                                <h1 id="location">{locationName}</h1>
                            </div>
                            <div className="current">
                                <h1> {icon} {weather?.temperature}℃</h1>
                                <h4>{weather?.symbolPhrase}</h4>
                                <p>Last Updated : {time}</p>
                            </div>
                            <div className="weatherDetails">
                                <div className="left">
                                    <p>Feels Like </p>
                                    <p>Wind  </p>
                                    <p>UV Index </p>
                                    <p>Humidity </p>
                                    <p>Dew Point </p>
                                </div>
                                <div className="right">
                                    <p> {weather?.feelsLikeTemp}°</p>
                                    <p> {windSpeed}km/h {weather?.windDirString} </p>
                                    <p> {weather?.uvIndex}  {uvIndexStr}</p>
                                    <p> {weather?.relHumidity}%</p>
                                    <p> {weather?.dewPoint}°</p>
                                </div>
                            </div>
                        </div>
                        <div className="hourlyWeather">
                            <h1>Hourly</h1>
                            <div className="hourCards">
                                {hourWeather && hourWeather.map((hourWeather) => (
                                    <HourlyCard key={hourWeather.time} hourWeather={hourWeather} />
                                ))}
                            </div>
                        </div>

                        <div className="dailyWeather">
                            <h1>Daily</h1>
                            <div className="dailyCards">
                                {dailyForecast && dailyForecast.map((dailyForecast) => (
                                    <DailyCard key={dailyForecast.date} dailyForecast={dailyForecast} />
                                ))
                                }
                            </div>
                        </div>
                    </div>}
            </div>
            }
        </>
    )
}

export default Search