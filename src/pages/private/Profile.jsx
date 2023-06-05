import { useEffect, useState } from "react"
import { editProfilePicService, editUsernameService, getUserDetails } from "../../services/profile.services"
import { useNavigate } from "react-router-dom"
import appleLogo from "../../assets/apple-logo.png"
import { uploadImageService } from "../../services/upload.services"
// Import a react spinner from react spinners (npm install react-spinners):
import { BounceLoader } from "react-spinners"

function Profile() {
  const navigate = useNavigate()
  // Create state for the User:
  const [user, setUser] = useState(null)
  // Create state if the data is Loading:
  const [isLoading, setIsLoading] = useState(true)
  // Create state for the user's imageUrl:
  // const [imageUrl, setImageUrl] = useState(null); 
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadingPictureForm, setShowUploadingPictureForm] = useState(false)
  const [showEditUsername, setShowEditUsername] = useState(false)
  // State or the username's input:
  const [usernameInput, setUsernameInput] = useState("")
  // State for an error message:
  const [errorMessage, setErrorMessage] = useState("")
  

  // Create a function to get the user's data:
  const getData = async () => {
    try {
      // Use a service to get all the data from a User:
      const response = await getUserDetails()
      // console.log(response.data);
      setUser(response.data)
      setUsernameInput(response.data.username)
      setIsLoading(false)
    } catch (error) {
      navigate("/error")
    }
  }

  // useEffect to call the getData function when the component is mounted:
  useEffect(() => {
    getData()
  }, [])

  // Create a function to upload the profile picture:
  const handleFileUpload = async (event) => {
    console.log("The file to be uploaded is: ", event.target.files[0]);
  
    if (!event.target.files[0]) {
      // to prevent accidentally clicking the choose file button and not selecting a file
      return;
    }
    setIsUploading(true); // to start the loading animation
  
    const uploadData = new FormData(); // images and other files need to be sent to the backend in a FormData
    uploadData.append("image", event.target.files[0])
  
    try {
      // Use a service to upload:
      const imageResponse = await uploadImageService(uploadData);
      // Set the imageUrl with the imageUrl that comes back from the
      // console.log(imageResponse.data.imageUrl);
      // setImageUrl(imageResponse.data.imageUrl);
      // Use a service to upload the picture to the User's document in the Database:
      const userResponse = await editProfilePicService(imageResponse.data.imageUrl);
      console.log(userResponse.data);
      setIsUploading(false)
      setShowUploadingPictureForm(false) // Hide the edit input
      setErrorMessage("")
      // Call getData() again to show the updated picture:
      getData()
    } catch (error) {
      navigate("/error");
    }
  }

  // Create a function to handleEditUsernameSubmit:
  const handleEditUsernameSubmit = async (e) => {
    e.preventDefault()
    try {

      setIsLoading(true)
      // Use a service to update the username:
      await editUsernameService(usernameInput)
      setIsLoading(false)
      setShowEditUsername(false)
      setErrorMessage("")
      // Call getData() again to show the updated username:
      getData()
    } catch(error) {
      console.log(error);
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
    <div className="profile">
      <h2>{user.username}' profile</h2>
      <div className="profile-container">
        <div className="profile-image-container">
          <img className="profile-pic" src={user.imageUrl ? user.imageUrl : appleLogo} alt="profile" />
          <div>
            {!showUploadingPictureForm && <button onClick={() => setShowUploadingPictureForm(true)}>Update Picture</button>}
            {showUploadingPictureForm && 
            <div><input
              type="file"
              name="image"
              onChange={handleFileUpload}
              disabled={isUploading}
            />
            <button onClick={() => setShowUploadingPictureForm(false)}>Cancel</button>
            </div>}
            {isUploading ? <div className="spinner-container">
              <BounceLoader color="blanchedalmond" size={100} />
            </div> : null}
          </div>
          
        </div>
        <div className="profile-info-container">
        {!showEditUsername && <div  className="profile-info-container-username">
            <h4 >Username: {user.username}</h4>
            <button onClick={() => setShowEditUsername(true)}>✎</button>
          </div>}
        {showEditUsername && <div className="profile-info-container-username">
            <form onSubmit={handleEditUsernameSubmit}>
              <input type="text" value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)}/>
              <button type="submit">Update</button>
              <button type="button" onClick={() => setShowEditUsername(false)}>Cancel</button>
            </form>
          </div>}
              
          <h4>Email: {user.email}</h4>
          <h5>Member since: {user.createdAt.slice(0,10)}</h5>
        </div>
      </div>
        <div>
          <h3>Current mood: {user.mood}</h3>
        </div>
      {errorMessage && <p style={{color: "red"}}>{errorMessage}</p>}
    </div>
  )
}

export default Profile