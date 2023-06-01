//* This is where we will code the services for the auth routes
// Import the service object:
import service from "./config.services"

// Let's create a service for each route (each service will access a specific Backend route):

const signupService = (user) => {
    // This service will receive the user from the signup form and send it to the post signup route in the Backend.
    return service.post("/auth/signup", user)
}

const loginService = (credentials) => {
    // This route will receive the credentials from the login form and send them to the post login route in the Backend.
    return service.post("/auth/login", credentials)
}

const verifyService = () => {
    return service.get("/auth/verify")
}

// Export all the services:
export {
    signupService,
    loginService,
    verifyService
}