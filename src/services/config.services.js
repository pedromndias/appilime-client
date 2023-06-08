//* Here we will configure the tool that we use to call the Backend
// Import axios, it we will use it to make the calls:
import axios from "axios";

// Create a service object with axios that will use the base URL of our server calls:
const service = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
})

//? Tell the Frontend that in all Backend axios calls they need to search a token.
// Let's invoke interceptors so it adds something to the call ritgh before it is processed:
service.interceptors.request.use((config) => {
    // Get the token from localStorage:
    const authToken = localStorage.getItem("authToken")
    // console.log(authToken) // ? Note how this is called on evety action. For example, when we login, it is called twice (first when the Login button is pressed and then when the verifyService is called by the authenticateUser function)
    // Validation:
    if (authToken) {
        // ? If it exists, we will add a new property called "authorization" to the headers of the config, that will include the token. Note that the isAuthenticated middleware verifies the token with "Bearer " + authToken.
        config.headers.authorization = `Bearer ${authToken}`
    }
    return config
})

// Export our service:
export default service