//? Use open-meteo API to get information about the weather

import axios from "axios"
import { useEffect, useState } from "react"
import { GridLoader } from "react-spinners"

function Weather() {

  // Create state for the weather:
  const [weather, setWeather] = useState(null)
  // Create state for the weather widget:
  const [weatherWidget, setWeatherWidget] = useState(null)
  // Create state for when the data is loading:
  const [isLoading, setIsLoading] = useState(true)

  // Create a function to get that data:
  const getData = async () => {
    try {
      const response = await axios.get("https://api.open-meteo.com/v1/forecast?latitude=41.37&longitude=2.17&hourly=temperature_2m,weathercode&forecast_days=1&timezone=Europe%2FBerlin")
      console.log(response.data);
      setWeather(response.data)
      if(response.data.hourly.weathercode[0] <= 3) {
        setWeatherWidget({description: "Cloudy"})
      } else if(response.data.hourly.weathercode[0] >= 61 && response.data.hourly.weathercode[0] <= 67) {
        setWeatherWidget({description: "Rainy"})
      } else if(response.data.hourly.weathercode[0] >= 80 && response.data.hourly.weathercode[0] <= 82) {
        setWeatherWidget({description: "Rainy"})
      } else  {
        setWeatherWidget({description: "Clear sky"})
      } 
      
      setIsLoading(false)
    } catch(error) {
      console.log(error)
    }
  }
  // useEffect to run getData when this component mounts:
  useEffect(() => {
    getData()    
  }, [])

  // Create a check clause if we are still loading (and give time to the Backend to return the data):
  if (isLoading) {
    return (
      <div className="spinner-container">
        <GridLoader color="rgba(0, 0, 0, 0.62)" size={50}/>
      </div>
    )
  }

  return (
    <div className="weather-container">
      
      
    <p>{weatherWidget.description}</p>
    <p>{weather.hourly.temperature_2m[0]}°C</p>

    </div>
  )
}

export default Weather