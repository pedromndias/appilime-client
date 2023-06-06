//* Let's create state for the theme routes context:
import {createContext, useEffect, useState} from "react"
import { BounceLoader } from "react-spinners"
import { verifyService } from "../services/auth.services"
import { getUserDetails } from "../services/profile.services"

// The ThemeContext component:
const ThemeContext = createContext()

// The ThemeWrapper component:
function ThemeWrapper(props) {
    //1. State and functions to export:

    // State to manage isLoading:
    const [isLoading, setIsLoading] = useState(true)
    // State for the theme:
    const [theme, setTheme] = useState("")
    // State for the use:
    // const [user, setUser] = useState(null)

    // Create a useEffect to run our manageTheme function when the component mounts:
    useEffect(() => {
        manageTheme()
    }, [])

    // Create a function to manage the theme:
    const manageTheme = async () => {
        try {
            // Call the verifyService so we get access to the user:
            const verifyResponse = await verifyService()
            // setUser(verifyResponse.data.payload)
            // console.log(response.data.payload);
            setIsLoading(false)
            // Get the user's mood:
            const userResponse = await getUserDetails(verifyResponse.data.payload._id)
            // console.log(userResponse.data.mood);
            let userMood = userResponse.data.mood;
    
            // Check which theme according with the mood:
            userMood==="focus" && setTheme("darkTheme");
            userMood==="lazy" && setTheme("grayTheme");
            userMood==="excited" && setTheme("redTheme");
            userMood==="melancholic" && setTheme("blueTheme");
        } catch (error) {
            // setUser(null)
            setIsLoading(false)
        }
    }

    //2. The context object we will pass:
    const passedContext = {
        theme,
        manageTheme
    }

    // If isLoading we should return a spinner:
    if (isLoading) {
        return (
          <div className="spinner-container">
            <BounceLoader color="blanchedalmond" size={100} />
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