import { useContext } from "react"
import logo from "../../assets/logo-with-name-02.png"
import { ThemeContext } from "../../context/theme.context";
import Sidebar from "../../components/navigation/Sidebar"
import Weather from "../../components/widgets/Weather"
import CryptoPrices from "../../components/widgets/CryptoPrices"
import Timer from "../../components/widgets/Timer"

function Main() {
  // Get the handleMoodChange function from context:
  const { handleMoodChange } = useContext(ThemeContext)
  
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