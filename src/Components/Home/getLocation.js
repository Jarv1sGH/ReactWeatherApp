import { currentWeather, hourlyWeather, dailyWeather } from '../../Api';


/* This function asks for user location and then pass the lattitude and longitude to geoApiUrl which returns with city name and countryCode.
    The city and countryCode is passed to foreca location id url and then it returns the id of the location, which is then passed to current
     weather url, hourlyUrl and dailyUrl respectively to fetch the weather details.
*/

export const getLocation = (setLoading, setLocationName,options,hourlyParams,dailyParams,weatherOptions, setWeather, setHourWeather, setDailyForecast, city, countryCode, url, locationID, weatherUrl, hourlyUrl, dailyUrl) => {
    setLoading(true);

    // if user approves location permission
    const success = async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
        await fetch(geoApiUrl)
            .then((response) => response.json())
            .then((response) => {
                city = response.city;
                countryCode = response.countryCode;
                url = `https://foreca-weather.p.rapidapi.com/location/search/${city}?country=${countryCode}`;
            });
        await fetch(url, options)
            .then((response) => response.json())
            .then((response) => {
                locationID = response.locations[0].id;
                setLocationName(
                    response.locations[0].name +
                    (', ') +
                    response.locations[0].adminArea +
                    (', ') +
                    countryCode
                );
                weatherUrl = `https://foreca-weather.p.rapidapi.com/current/${locationID}`;
                hourlyUrl = `https://foreca-weather.p.rapidapi.com/forecast/hourly/${locationID}${hourlyParams}`;
                dailyUrl = `https://foreca-weather.p.rapidapi.com/forecast/daily/${locationID}${dailyParams}`;
            });

        currentWeather(weatherUrl, weatherOptions, setWeather, setLoading);
        hourlyWeather(hourlyUrl, options, setHourWeather);
        dailyWeather(dailyUrl, options, setDailyForecast);
    };


    
    // if user denies location permission
    const error = () => {
        weatherUrl = `https://foreca-weather.p.rapidapi.com/current/101273294`;
        hourlyUrl = `https://foreca-weather.p.rapidapi.com/forecast/hourly/101273294${hourlyParams}`;
        dailyUrl = `https://foreca-weather.p.rapidapi.com/forecast/daily/101273294${dailyParams}`;
        setLocationName('New Delhi, India');
        currentWeather(weatherUrl, weatherOptions, setWeather, setLoading);
        hourlyWeather(hourlyUrl, options, setHourWeather);
        dailyWeather(dailyUrl, options, setDailyForecast);
    };

    navigator.geolocation.getCurrentPosition(success, error);
};
