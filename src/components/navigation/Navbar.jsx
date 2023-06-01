import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"

function Navbar() {
  const navigate = useNavigate()

  // Let's create state for if the user is logged in or not (we get it from context):
  const {isLoggedIn, authenticateUser} = useContext(AuthContext)

  // Function to handle the logout:
  const handleLougout = () => {
    //1. Delete the token
    localStorage.removeItem("authToken")
    //2. Validate with Backend that the token was deleted (calling authenticateUser without a valid token will reset isLoggedIn and user states):
    authenticateUser()
    //3. Redirect to Home:
    navigate("/")
  }

  return (
    <div className="navbar">
      {!isLoggedIn && <Link to="/">Home</Link>}
      {!isLoggedIn && <Link to="/auth/signup">Register</Link>}
      {!isLoggedIn && <Link to="/auth/login">Access</Link>}

      {isLoggedIn && <Link to="/main">Home</Link>}
      {isLoggedIn && <Link to="/profile">Profile</Link>}
      {isLoggedIn && <button onClick={handleLougout}>Logout</button>}
    </div>
  )
}

export default Navbar