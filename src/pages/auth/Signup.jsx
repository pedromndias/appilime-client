import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { signupService } from "../../services/auth.services"
import { GridLoader } from "react-spinners"



function Signup() {
  // useNavigate to redirect:
  const navigate = useNavigate()

  // Create states for each input:
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  // State for an error message:
  const [errorMessage, setErrorMessage] = useState("")
  // Create state for when the data is loading:
  const [isLoading, setIsLoading] = useState(false)

  // Create the handlers for when each input changes:
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Create a handler for when the form is submitted:
  const handleSignup = async (e) => {
    // Prevent the browser from refreshing:
    e.preventDefault();

    try {
      setIsLoading(true)
      // Create an user object to use it with the signupService:
      const user = {
        username,
        email,
        password
      }
      // Call the service (async process, it will contact the DB):
      await signupService(user)
      // If successful we can redirect to the login page:
      setIsLoading(false)
      navigate("/auth/login")
    } catch (error) {
      setIsLoading(false)
      // If we get a 400 error (bad request because the cliente sent the wrong data), we can specify the error message that comes from the Backend validation:
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage)
      } else {
        // If the error is not 400 we will redirect to the Error page:
        navigate("/error");
      }
    }
  }

  // Create a check clause if we are still loading (and give time to the Backend to return the data):
  if (isLoading) {
    return (
      <div className="spinner-container">
        <GridLoader color="rgba(0, 0, 0, 0.62)" size={50}/>
      </div>
    )
  }

  return (
    <div className="signup-form-container">
      <h1>Signup</h1>
      <form className="signup-form" onSubmit={handleSignup}>
        <div className="signup-form-input">
          <label htmlFor="username">Username: </label>
          <input type="text" name="username" value={username} onChange={handleUsernameChange} autoComplete="off"/>
        </div>
        <div className="signup-form-input">
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" value={email} onChange={handleEmailChange}/>
        </div>
        <div className="signup-form-input">
          <label htmlFor="password">Password: </label>
          <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
        </div>

        <br />
        
        <button className="signup-button"  type="submit">Signup</button>

        {/* If we have an error, we will show it: */}
        {errorMessage && <p style={{color: "red"}}>{errorMessage}</p>}

      </form>
    </div>
  )
}

export default Signup