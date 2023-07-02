import { Link } from "react-router-dom"
import logo from "../assets/logo-with-name-02.png"

function Home() {
  return (
    <div className="home-container">
      <img src={logo} alt="logo" />
      <Link to={"/auth/signup"}>Register</Link>
      <p>or</p>
      <Link to={"/about"}>Read More</Link>
    </div>
  )
}

export default Home