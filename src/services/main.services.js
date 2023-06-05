//* This is where we will code the services for the Main routes:
// Import the service:
import service from "./config.services"

// Create a function to get the user's mood:
const getUserMoodService = () => {
    return service.get("/main")
}

// Create a function to edir the user's mood:
const editUserMoodService = (mood) => {
    return service.patch("/main", {mood})
}

export {
    getUserMoodService,
    editUserMoodService
}