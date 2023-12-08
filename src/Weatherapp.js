import { useState, useEffect } from 'react'
import './App.css'

const Weatherapp = () => {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Api key
    const apiKey = '0eede98d3ac5c3d35a75695ddc1f55fa'

    // Fetch Function
    const fetchWeatherData = async () => {
        try {
            setLoading(true);
            setError(false);
            // Fetching Data
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
            // Throw error
            if (!response.ok) { throw new Error("Unable to fetch"); }
            // Convering to json format
            const data = await response.json();
            setWeatherData(data);
        }
        catch (error) { setError(true) }
        finally { setLoading(false) }
    }
    // Handling the click function
    const handleFetchWeather = () => {
        if (city) {
            fetchWeatherData();
        }
        else {
            setError("Please enter city")
        }
    }
    // ComponentDidUpdate using the particular state
    useEffect(() => {
    }, [city]);


    return (
        <div>
            <h1>Weather Application</h1>
            <input type='text' placeholder='Enter your city' value={city} onChange={(e) => setCity(e.target.value)} /><br />
            <button onClick={handleFetchWeather}>Get Weather</button>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {weatherData &&
                <div>
                    <h2>{weatherData.name},{weatherData.sys.country}</h2>
                    <p>Temprature : {weatherData.main.temp} &#8451;</p>
                    <p>Weather : {weatherData.weather[0].description}</p>
                </div>}
        </div>
    )
}

export default Weatherapp
