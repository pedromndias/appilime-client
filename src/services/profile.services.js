//* This is where we will code the services for the Profile routes:
// Import the service:
import service from "./config.services"

// Create a function to get all the data from a User:
const getUserDetails = () => {
    return service.get("/profile")
}

// Create a function to edit the username of a User:
const editUsernameService = (username) => {
    return service.patch("/profile/username", {username})
}

// Create a function to edit the User's profile picture:
const editProfilePicService = (imageUrl) => {
    return service.patch("/profile/picture", {imageUrl})
}

export {
    getUserDetails,
    editUsernameService,
    editProfilePicService
}