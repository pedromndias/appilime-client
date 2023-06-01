//* Let's create state for the authorization routes context:

import { createContext, useEffect, useState } from "react";
import { verifyService } from "../services/auth.services";

// The AuthContext component:
const AuthContext = createContext()

// The AuthWrapper component:
function AuthWrapper(props) {
    //* The 3 sections of the context:
    //1. States and functions to export:
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null)
    // State to manage when the data is loading (the App starts by validating the token)
    const [isLoading, setIsLoading] = useState(true)

    //? reate a useEffect to run authenticateUser when the component mounts (the AuthWrapper, that is wrapping our App). It will first check if there is a token and render the spinner while waiting for the response. The authenticateUser function was only being called when the person was doing login, but we should check if there is a token so the isLoggedIn and user state are correct and we can use them even if we refresh the page.
    useEffect(() => {
        authenticateUser()
    }, [])

    // Function that will invoke the verifyService to validate the token and receive the payload (should be called when the user logs in)
    const authenticateUser = async () => {

        try {
            // Call the verifyService:
            const response = await verifyService()
            console.log("Token validated")
            console.log(response);
            // setIsLogin to true:
            setIsLoggedIn(true)
            // setUser with the payload:
            setUser(response.data.payload)
            // Set isLoading to false:
            setIsLoading(false)
        } catch (error) {
            console.log("Token not valid or there is no token")
            console.log(error);
            // If there is a problem with the token then we should reset the states:
            setIsLoggedIn(false);
            setUser(null)
            // Set isLoading to false:
            setIsLoading(false)
        }
    }

    //2. The context object we will pass:
    const passedContext = {
        isLoggedIn,
        user,
        authenticateUser
    }

    // If isLoading we should return a spinner:
    if (isLoading) {
        return (
            <div className="App">
                <h3>...Validating credentials</h3>
            </div>
        )
    }

    //3. App render with context
    return (
        <AuthContext.Provider value={passedContext}>
            {props.children}
        </AuthContext.Provider>
    )
}

export {
    AuthContext,
    AuthWrapper
}