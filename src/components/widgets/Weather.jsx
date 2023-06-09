//? Use open-meteo API to get information about the weather

import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { GridLoader } from "react-spinners"

function Weather() {
  // ? Let's create states to the drag functionality
  // When the component is pressed by the mouse:
  const [pressed, setPressed] = useState(false)
  // The position of the component. Start at {x: 20, y: 20}
  const [weatherComponentPosition, setWeatherComponentPosition] = useState({x: 0, y: 0})
  // useRef so we maintain a value between renders:
  const ref = useRef()

  // Create state for the weather:
  const [weather, setWeather] = useState(null)
  // Create state for the weather widget:
  const [weatherWidget, setWeatherWidget] = useState(null)
  // Create state for when the data is loading:
  const [isLoading, setIsLoading] = useState(true)

  // Create a function to change the the ref value of the position:
  const changePositionWhenDragged = () => {
    // Check the current value of our ref and translate it when there is a change of position in x and y:
    if (ref.current) {
      ref.current.style.transform = `translate(${weatherComponentPosition.x}px, ${weatherComponentPosition.y}px)`
    }
  }

  // useEffect to call changePositionWhenDragged when there is any position change (note the dependency)
  useEffect(() => {
    changePositionWhenDragged()
  }, [weatherComponentPosition])

  // We should update the current position when the mouse is pressed:
  const mousePressedMove = (e) => {
    if (pressed) {
      setWeatherComponentPosition( {
        x: weatherComponentPosition.x + e.movementX,
        y: weatherComponentPosition.y + e.movementY
      })
    }
  }

  // Create a function to get that data:
  const getData = async () => {
    try {
      const response = await axios.get("https://api.open-meteo.com/v1/forecast?latitude=41.37&longitude=2.17&hourly=temperature_2m,weathercode&forecast_days=1&timezone=Europe%2FBerlin")
      // console.log(response.data);
      setWeather(response.data)
      if(response.data.hourly.weathercode[0] <= 3) {
        setWeatherWidget({description: "Cloudy", emoji: "🌤️"})
      } else if(response.data.hourly.weathercode[0] >= 61 && response.data.hourly.weathercode[0] <= 67) {
        setWeatherWidget({description: "Rainy", emoji: "🌧️"})
      } else if(response.data.hourly.weathercode[0] >= 80 && response.data.hourly.weathercode[0] <= 82) {
        setWeatherWidget({description: "Rainy", emoji: "🌦️"})
      } else  {
        setWeatherWidget({description: "Clear sky", emoji: "☀️"})
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
        <GridLoader color="rgba(0, 0, 0, 0.62)" size={20}/>
      </div>
    )
  }

  return (
    <div ref= {ref} onMouseMove={mousePressedMove} onMouseDown={() => setPressed(true)} onMouseUp={() => setPressed(false)}>
      <div className="weather-container">
        <p className="weather-emoji">{weatherWidget.emoji}</p>
        <div className="weather-info">
          <p>{weatherWidget.description}</p>
          <p>{weather.hourly.temperature_2m[0]}°C</p>
        </div>

      </div>
    </div>
  )
}

export default Weather