import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
// Import ThemeContext so we can access its states and functions:
import { ThemeContext } from "../../context/theme.context";

function Navbar() {
  // Get the theme from context:
  const {setTheme} = useContext(ThemeContext)
  const navigate = useNavigate()

  // Let's create state for if the user is logged in or not (we get it from context):
  const {isLoggedIn, authenticateUser} = useContext(AuthContext)
  // Create state to show or hide the nav menu:
  const [showNavMenu, setShowNavMenu] = useState(false);

  // Create a handler to just switch the values of showNavMenu
  const handleShowNavMenu = () => {
    setShowNavMenu(showNavMenu => !showNavMenu)
  }

  // Create useEffect to reload the page when we change

  // Function to handle the logout:
  const handleLougout = () => {
    //1. Delete the token
    localStorage.removeItem("authToken")
    //2. Validate with Backend that the token was deleted (calling authenticateUser without a valid token will reset isLoggedIn and user states):
    authenticateUser()
    //3. Change the context theme to default (""):
    setTheme("")
    //4. Redirect to Home:
    navigate("/")
  }

  return (
    <div>
      <div className="navbar">
        {!isLoggedIn && <Link to="/">Home</Link>}
        {!isLoggedIn && <Link to="/auth/signup">Register</Link>}
        {!isLoggedIn && <Link to="/auth/login">Access</Link>}

        {isLoggedIn && <Link to="/main">Home</Link>}
        {isLoggedIn && <Link to="/profile">Profile</Link>}
        {isLoggedIn && <button className="logout-button" onClick={handleLougout}>Logout</button>}
        {isLoggedIn && <button className="open-nav-button" onClick={handleShowNavMenu}>Menu</button>}
      </div>
      {showNavMenu && <div className="open-nav">
        <button onClick={handleShowNavMenu}>X</button>
        {isLoggedIn && <Link onClick={handleShowNavMenu} to="/lists">To-Dos</Link>}
        {isLoggedIn && <Link onClick={handleShowNavMenu} to="/expenses">Expenses</Link>}
        {isLoggedIn && <Link onClick={handleShowNavMenu} to="/timer">Timer</Link>}
        {isLoggedIn && <Link onClick={handleShowNavMenu} to="/game">Game</Link>}
        {isLoggedIn && <button className="logout-button-mobile" onClick={handleLougout}>Logout</button>}
      </div>} 
    </div>
  )
}

export default Navbar