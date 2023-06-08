import { useState, useContext } from "react"
import logo from "../../assets/logo-with-name-02.png"
import { GridLoader } from "react-spinners"
import { useNavigate } from "react-router-dom"
import { editUserMoodService } from "../../services/main.services"
import { ThemeContext } from "../../context/theme.context";
import Sidebar from "../../components/navigation/Sidebar"
import Weather from "../../components/Weather"
import CryptoPrices from "../../components/CryptoPrices"
import Timer from "../../components/Timer"

function Main() {
  // Get the manageTheme function:
  const {manageTheme, handleMoodChange } = useContext(ThemeContext)
  // State for when it is loading:
  // const [isLoading, setIsLoading] = useState(false)

 
  // Create handler to update mood in DB and context:
  // const handleMoodChange = async (mood) => {
  //   try {
  //     setIsLoading(true)
  //     // Update modo on DB:
  //     await editUserMoodService(mood)
  //     // Call context function:
  //     await manageTheme()
  //     setIsLoading(false)
  //     // console.log("Mood changed");
  //   } catch (error) {
  //     navigate("/error")
  //   }
  // }

  // Create a check clause if we are still loading (and give time to the Backend to return the data):
  // if (isLoading) {
  //   return (
  //     <div className="spinner-container">
  //       <GridLoader color="rgba(0, 0, 0, 0.62)" size={50}/>
  //     </div>
  //   )
  // }
  
  return (
    <div className="main-container-general">
      <div className="sidebar-crypto-container">
        <Sidebar />
        <div className="crypto-component">
          <CryptoPrices />
        </div>
      </div>
      <div className="main-container">
        <img src={logo} alt="logo" />
        <h2>How's your mood?</h2>
        <div className="theme-button-container">
          <button className="theme-button focus-button" onClick={()=>handleMoodChange("focus")}>focus</button>
          <button className="theme-button lazy-button" onClick={()=>handleMoodChange("lazy")}>lazy</button>
          <button className="theme-button excited-button" onClick={()=>handleMoodChange("excited")}>excited</button>
          <button className="theme-button melancholic-button" onClick={()=>handleMoodChange("melancholic")}>melancholic</button>
        </div>
      </div>
      <div className="weather-price-container">
        <div className="timer-component">
          <Timer />
        </div>
        <div className="weather-component">
          <Weather />
        </div>
      </div>
    </div>
  )
}

export default Main