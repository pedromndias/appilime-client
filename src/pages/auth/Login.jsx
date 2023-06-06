import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { loginService } from "../../services/auth.services"
import { BounceLoader } from "react-spinners"

// Import ThemeContext so we can access its states and functions:
import { ThemeContext } from "../../context/theme.context";

// Import AuthContext so we can access its states and functions:
import { AuthContext } from "../../context/auth.context"

function Login() {
  // Get the theme from context:
  const {manageTheme} = useContext(ThemeContext)
  // Get the authenticateUser function:
  const {authenticateUser} = useContext(AuthContext)

  // useNavigate to redirect:
  const navigate = useNavigate()

  // Create states for each input:
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  // State for the error message:
  const [errorMessage, setErrorMessage] = useState("")
  // Create state for when the data is loading:
  const [isLoading, setIsLoading] = useState(false)

  // Create handlers for when the input changes:
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Create a handler for when the form is submitted:
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true)
      // Get the response from the loginService (it will be a token):
      const response = await loginService({
        email,
        password
      })
      // console.log(response.data.authToken)
      //* Let's deal with the token that we get from response (sent by the Backend):
      // 1. Save the token in a safe place of the browser (localStorage):
      localStorage.setItem("authToken", response.data.authToken)
      // 2. Call authenticateUser to validate the token (know who the user is and if he is logged in):
      await authenticateUser()

      // Call manageTheme and send the logged in user's mood:
      manageTheme()
      setIsLoading(false)
      // Navigate to Main:
      navigate("/main")
    } catch (error) {
      setIsLoading(false)
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage)
      } else {
        navigate("/error");
      }
    }
  }

  // Create a check clause if we are still loading (and give time to the Backend to return the data):
  if (isLoading) {
    return (
      <div className="spinner-container">
        <BounceLoader color="blanchedalmond" size={100} />
      </div>
    )
  }

  return (
    <div className="login-form-container">
      <h1>Login</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="login-form-input">
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" value={email} onChange={handleEmailChange}/>
        </div>
        <div className="login-form-input">
          <label htmlFor="password">Password: </label>
          <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
        </div>

        <br />
        
        <button className="login-button" type="submit">Login</button>

        {/* If we have an error, we will show it: */}
        {errorMessage && <p style={{color: "red"}}>{errorMessage}</p>}

      </form>
    </div>
  )
}

export default Login