//* This is where we will code the services for the upload route:
// Import the service:
import service from "./config.services"

// Create a function that will contact the Backend and send the image to Cloudinary:
const uploadImageService = (imageFile) => {
    return service.post("/upload", imageFile);
}

export {
    uploadImageService
}