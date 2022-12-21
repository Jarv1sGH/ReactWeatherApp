import sun from "../Images/icons/d000.png";  
import cloudSun from "../Images/icons/d300.png";  
import cloudMoon from "../Images/icons/n300.png"; 
import sunRain from "../Images/icons/d320.png"; 
import moonRain from "../Images/icons/n320.png"; 
import moon from "../Images/icons/n000.png"; 
import cloudRain from "../Images/icons/d410.png"; 
import clouds from "../Images/icons/d400.png"; 
import thunderstorm from "../Images/icons/d440.png"; 
import thinCloudsDay from "../Images/icons/d500.png"; 
import thinCloudsNight from "../Images/icons/n500.png"; 
import haze from "../Images/icons/d600.png"; 
import rain from "../Images/icons/d430.png"; 



export const Icons = (symbol, icon,className) => {

    //day Icons
    if (symbol?.charAt(0) === 'd') {
        switch (symbol) {
            case 'd000':
            case 'd100':
                icon = <img src={sun} alt="icon" />
                className = "weather clearDay" 
                break;

            case 'd200':
            case 'd300':
                icon = <img src={cloudSun} alt="icon" />
                className = "weather Cloudy" 
                break;
            case 'd220':
            case 'd320':
                icon = <img src={sunRain} alt="" />
                className = "weather rainDay" 
                break;
            case 'd500':
                icon = <img src={thinCloudsDay} alt="" />
                className = "weather clearDay" 
                break;
            default:
                break;
        }
    }

    //Night Icons
    if (symbol?.charAt(0) === 'n') {
        switch (symbol) {
            case 'n000':
            case 'n100':
                icon = <img src={moon} alt="icon" />
                className = "weather clearNight" 
                break;

            case 'n200':
            case 'n300':
                icon = <img src={cloudMoon} alt="icon" />
                className = "weather clearNight" 
                break;
            case 'n220':
            case 'n320':
                icon = <img src={moonRain} alt="" />
                className = "weather rainNight" 
                break;
                
            case 'n500':
                icon = <img src={thinCloudsNight} alt="" />
                className = "weather clearNight" 
                break;

            default:
                break;
        }
    }

    // for rain 
    if (symbol?.charAt(2) === '1' && symbol?.charAt(3) === '0') {
        icon = <img src={cloudRain} alt="" />
        className = "weather rainNight" 
    }

    // for thunderstorm 
    if (symbol?.charAt(2) === '4' && symbol?.charAt(3) === '0') {
        icon = <img src={thunderstorm} alt="" />
        className = "weather Thunderstorm" 

    }

    // for snow
    if (symbol?.charAt(3) === '1' || symbol?.charAt(3) === '2') {
        icon = <i style={{ "color": "white" }} className="fa-regular fa-snowflake"></i>
        className = "weather clearDay" 

    }

    // for the rest
    switch (symbol) {
        case 'd400':
        case 'n400':
            icon = icon = <img src={clouds} alt="" />
            className = "weather Overcast" 
            break;

        case 'd600':
        case 'n600':
            icon = icon = <img src={haze} alt="" />
            className = "weather Haze" 
            break;

        case 'd420':
        case 'd430':
        case 'n420':
        case 'n430':
            icon = icon = <img src={rain} alt="" />
            className = "weather rainNight" 
            break;

        default:
            break;
    }

    return [icon,className];

}