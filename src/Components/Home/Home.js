import React from 'react'
import { useState, useEffect } from 'react';
import "./Home.css"
import HourlyCard from "../Cards/HourlyCard"
import DailyCard from "../Cards/DailyCard";
import Loader from '../Loader/Loader';
import { Icons } from '../icons';
import { uvIndexValue, } from '../../Api';
import { getLocation } from './getLocation';
const Home = () => {
    const apiKey = process.env.REACT_APP_FORECA_API_KEY;
    const [loading, setLoading] = useState(false);
    const [weather, setWeather] = useState({});
    const [hourWeather, setHourWeather] = useState(['']);
    const [dailyForecast, setDailyForecast] = useState(['']);
    const [locationName, setLocationName] = useState('');

    const hourlyParams = "?alt=0&tempunit=C&windunit=MS&tz=Europe%2FLondon&periods=12&dataset=full&history=0";
    const dailyParams = "?alt=0&tempunit=C&windunit=MS&periods=8&dataset=full";
    let symbol = weather?.symbol;
    let icon;
    let className;
    let locationID;
    let city;
    let countryCode;
    let url;
    let weatherUrl;
    let hourlyUrl;
    let dailyUrl;

    useEffect(() => {
        let ignore = false;
        if (!ignore) {
            getLocation(setLoading, setLocationName, options, hourlyParams, dailyParams, weatherOptions, setWeather, setHourWeather,
                setDailyForecast, city, countryCode, url, locationID, weatherUrl, hourlyUrl, dailyUrl);

        }
        return () => { ignore = true; }
    },
        // eslint-disable-next-line 
        [])


    const weatherOptions = {
        params: { alt: '0', tempunit: 'C', windunit: 'km/h', tz: 'Europe/London', lang: 'en' },
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'foreca-weather.p.rapidapi.com'
        }
    };

    const options = {
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'foreca-weather.p.rapidapi.com'
        }
    };

    //for scrolling hourly cards
    const containerRef = React.useRef(null);
    const handleScrollLeft = () => {
        containerRef.current.scrollLeft -= 1000;
    };
    const handleScrollRight = () => {
        containerRef.current.scrollLeft += 1000;
    };

    //Extracting Time 
    let minutes;
    let hours;
    function extractTime(dateString) {
        const date = new Date(dateString);

        // Extracting the hours, minutes, and seconds from the date object
        hours = date.getHours();
        minutes = date.getMinutes();
        return `${hours}:${minutes}`;
    }
    const dateString = weather?.time; // Extracting the date&time from current weather data
    const time = extractTime(dateString);


    // UV index
    let uvIndexStr;
    uvIndexStr = uvIndexValue(uvIndexStr, weather);

    // Converting to km/h becasue for some reason api doesn't want to return speed in km/h or mph, even if the windUnit params is provided with km/h :/
    let windSpeed = Math.floor(weather?.windSpeed * 3.6);

    //Setting Icon and Background Image according to current weather
    let values = Icons(symbol, icon, className);
    icon = values[0];
    className = values[1];

    return (
        <>

            {loading ? <Loader /> : (
                <>
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
                                <div>
                                    <p>Feels Like </p>
                                    <p>Wind  </p>
                                    <p>UV Index </p>
                                    <p>Humidity </p>
                                    <p>Dew Point </p>
                                </div>
                                <div className="right">
                                    <p> {weather?.feelsLikeTemp}°</p>
                                    <p> {windSpeed}km/h {weather?.windDirString} </p>
                                    <p> {weather?.uvIndex} {uvIndexStr}</p>
                                    <p> {weather?.relHumidity}%</p>
                                    <p> {weather?.dewPoint}°</p>
                                </div>
                            </div>
                        </div>


                        <div className="hourlyWeather">
                            <h1>Hourly</h1>
                            <div className="btnContainer">
                                <div className='scrollBtnDivLeft'>
                                <button className='scrollBtn scrollBtnLeft' onClick={handleScrollLeft}><i className="fa-solid fa-chevron-left"></i></button>
                                </div>
                                <div ref={containerRef} className="hourCards" >
                                    {hourWeather && hourWeather.map((data) => (
                                        <HourlyCard key={data.time} hourWeather={data} />
                                    ))}
                                </div>
                                <div className='scrollBtnDivRight'>
                                <button className='scrollBtn scrollBtnRight' onClick={handleScrollRight}><i className="fa-solid fa-chevron-right"></i></button>
                                </div>
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
                    </div>
                </>
            )
            }



        </>
    )
}

export default Home;
