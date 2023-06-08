//* Let's create state for the theme routes context:
import {createContext, useEffect, useState, useContext} from "react"
import { GridLoader } from "react-spinners"
import { verifyService } from "../services/auth.services"
import { getUserDetails } from "../services/profile.services"
import { AuthContext } from "./auth.context"
import { useNavigate } from "react-router-dom"
import { editUserMoodService } from "../services/main.services"
// The ThemeContext component:
const ThemeContext = createContext()

// The ThemeWrapper component:
function ThemeWrapper(props) {
    const navigate = useNavigate()
    //1. State and functions to export:
    const { user } = useContext(AuthContext)

    // State to manage isLoading:
    const [isLoading, setIsLoading] = useState(true)
    // State for the theme:
    const [theme, setTheme] = useState("")
    // State for the use:
    // const [user, setUser] = useState(null)

    // Create a useEffect to run our manageTheme function when the component mounts:
    useEffect(() => {
        manageTheme()
    }, []) // user?

    
    const handleMoodChange = async (mood) => {
        try {
        // Update the user on DB:
        await editUserMoodService(mood)
        await manageTheme()
        } catch(error) {
            navigate("/error")
        }
    }

    // Create a function to manage the theme:
    const manageTheme = async () => {
        try {
            // Call the verifyService so we get access to the user:
            // const verifyResponse = await verifyService()
            // console.log(verifyResponse.data.payload);
            
            // If we don't have any user logged in, there is no theme selected (page shows default styles):
            // console.log(user);
            if(!user) {
                setTheme("")
                
            } else {
                const userResponse = await getUserDetails(user._id)
                // Get the user's mood:
                let userMood = userResponse.data.mood
                // Check which theme according with the mood:
                userMood==="focus" && setTheme("darkTheme");
                userMood==="lazy" && setTheme("greenTheme");
                userMood==="excited" && setTheme("redTheme");
                userMood==="melancholic" && setTheme("blueTheme");
            }
            setIsLoading(false)
        } catch (error) {
            // setUser(null)
            setIsLoading(false)
        }
    }
    

    //2. The context object we will pass:
    const passedContext = {
        theme,
        setTheme,
        manageTheme,
        handleMoodChange
    }

    // If isLoading we should return a spinner:
    if (isLoading) {
        return (
          <div className="spinner-container">
            <GridLoader color="rgba(0, 0, 0, 0.62)" size={50}/>
          </div>
        )
    }

    //3. App render with context
    return (
        <ThemeContext.Provider value={passedContext}>
            {props.children}
        </ThemeContext.Provider>
    )
    
}

export {
    ThemeContext,
    ThemeWrapper
}