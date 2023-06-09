import { useEffect, useState } from "react"
import { editProfilePicService, editUsernameService, getUserDetails } from "../../services/profile.services"
import { useNavigate } from "react-router-dom"
import profilePicDefault from "../../assets/default-profile-pic.png"
import { uploadImageService } from "../../services/upload.services"
// Import a react spinner from react spinners (npm install react-spinners):
import { GridLoader, BarLoader } from "react-spinners"
import Sidebar from "../../components/navigation/Sidebar"

function Profile() {
  const navigate = useNavigate()
  // Create state for the User:
  const [user, setUser] = useState(null)
  // Create state if the data is Loading:
  const [isLoading, setIsLoading] = useState(true);
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
        <GridLoader color="rgba(0, 0, 0, 0.62)" size={50}/>
      </div>
    )
  }

  return (
    <div className="container-with-sidebar">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="profile">
        <h2>{user.username}'s profile</h2>
        <div className="profile-container">
          <div>
            <img className="profile-pic" src={user.imageUrl ? user.imageUrl : profilePicDefault} alt="profile" />
            <div className="update-pic-input-container">
              {!showUploadingPictureForm && <button className="update-pic-button" onClick={() => setShowUploadingPictureForm(true)}>Update Picture</button>}
              {showUploadingPictureForm && 
              <div className="update-pic-input"><input 
                type="file"
                name="image"
                onChange={handleFileUpload}
                disabled={isUploading}
              />
              <button className="update-pic-button update-pic-button-cancel" onClick={() => setShowUploadingPictureForm(false)}>Cancel</button>
              </div>}
              {isUploading ? <div className="spinner-container">
                <BarLoader color="rgba(0, 0, 0, 0.62)" size={10}/>
              </div> : null}
            </div>
            
          </div>
          <div className="profile-info-container">
          {!showEditUsername && <div  className="profile-info-container-username">
              <h3>Username: {user.username}</h3>
              <button onClick={() => setShowEditUsername(true)}>✎</button>
            </div>}
          {showEditUsername && <div className="profile-info-container-username">
              <form onSubmit={handleEditUsernameSubmit}>
                <input type="text" value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)}/>
                <div className="update-username-buttons-container">
                  <button className="update-username-button" type="submit">Update</button>
                  <button type="button" className="update-username-button" onClick={() => setShowEditUsername(false)}>Cancel</button>
                </div>
                
              </form>
            </div>}
                
            <h3>Email: {user.email}</h3>
            <h5>Member since: {user.createdAt.slice(0,10)}</h5>
          </div>
        </div>
          <div>
            <h3>Current mood: <span id={`${user.mood}-word`}>{user.mood}</span></h3>
          </div>
        {errorMessage && <p style={{color: "red"}}>{errorMessage}</p>}
      </div>
    </div>
  )
}

export default Profile