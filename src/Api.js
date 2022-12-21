//For Current Weather
export const currentWeather = (weatherUrl, weatherOptions, setWeather, setLoading) => {
    try {
        fetch(weatherUrl, weatherOptions)
            .then((response) => response.json())
            .then(response => {
                setWeather(response.current);
                setLoading(false);
            })


    }
    catch (err) {
        console.error(err);
    }
}


// For Hourly forecast
export const hourlyWeather = async (hourlyUrl, options, setHourWeather) => {
    try {
        fetch(hourlyUrl, options)
            .then(response => response.json())
            .then(response => {
                setHourWeather(response.forecast);
            })
    } catch (err) {
        console.error(err);
    }
}


// For Daily forecast
export const dailyWeather = async (dailyUrl, options, setDailyForecast) => {
    try {
        fetch(dailyUrl, options)
            .then(response => response.json())
            .then(response => {
                setDailyForecast(response.forecast);
            })
    } catch (err) {
        console.error(err);
    }
}


export const uvIndexValue = (uvIndexStr, weather) => {
    if (weather?.uvIndex > 0 && weather?.uvIndex <= 2) {
        uvIndexStr = <span style={{ "color": "#00e400" }}>Low</span>;
    }
    if (weather?.uvIndex > 2 && weather?.uvIndex <= 5) {
        uvIndexStr = <span style={{ "color": "#ffff00" }}>Moderate</span>;
    }
    if (weather?.uvIndex > 5 && weather?.uvIndex <= 7) {
        uvIndexStr = <span style={{ "color": "#ff7e00" }}>High</span>;
    }
    if (weather?.uvIndex > 7 && weather?.uvIndex <= 10) {
        uvIndexStr = <span style={{ "color": "#ff0000" }}>Very High</span>;
    }
    if (weather?.uvIndex > 10) {
        uvIndexStr = <span style={{ "color": "#99004c" }}>Extreme</span>;
    }

    return uvIndexStr;
}