import { useState, useEffect } from 'react'
import weatherService from '../services/weatherService'

const Weather = ({capital, capitalLatLng}) => {
    const [weather, setWeather] = useState(null)
    useEffect(() => {
        if (!capitalLatLng || capitalLatLng.length !== 2) return
        const [lat, lon] = capitalLatLng
        weatherService.getWeather(lat, lon).then(setWeather)
    }, [capitalLatLng])

    if (!weather) return <p>Loading weather...</p>

    return (
        <div>
            <h2>Weather in {capital}</h2>
            <p>Temperature {weather.main.temp} °C</p>
            <img 
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
            />
            <p>Wind {weather.wind.speed} m/s</p>
        </div>
    )
}

export default Weather