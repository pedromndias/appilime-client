import { useEffect, useState } from "react";
// Make use of react-leaflet to render maps:
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteExpenseService, editExpenseService, getExpenseDetailsService } from "../../services/expenses.services";
import axios from "axios";
import { GridLoader } from "react-spinners"
import Sidebar from "../../components/navigation/Sidebar";


function ExpensesDetails() {
  // Let's create state for the map:
  const [ center, setCenter ] = useState([51.505, -0.09])
  // Let's create state for the marker's position position:
  const [markerPosition, setMarkerPosition] = useState(null);
  const barcelonaCoords = [41.390106945633164, 2.1766662597656254]
  
  const navigate = useNavigate()
  const params = useParams()

  // States:
  const [expense, setExpense] = useState(null)

  const [isEditing, setIsEditing] = useState(false)
  const [nameInput, setNameInput] = useState("")
  const [priceInput, setPriceInput] = useState(0)
  const [locationInput, setLocationInput] = useState("")
  // State for an error message:
  const [errorMessage, setErrorMessage] = useState("")
  // Create state for when it is loading:
  const [isLoading, setIsLoading] = useState(true)
  // Create state for the search location results:
  const [searchLocationResults, setSearchLocationResults] = useState(null)
  // Create state for the coordinates:
  const [coordinates, setCoordinates] = useState([])

  // Create handlers for each input change:
  const handleNameChange = (e) => {
    // console.log(e.target.value)
    setNameInput(e.target.value)
  }
  const handlePriceChange = (e) => {
    setPriceInput(e.target.value)
  }
  const handleGeoLocationChange = (e) => {
    setLocationInput(e.target.value)
    // Call finAddress with the e.target.value to find 3 possible address matches with that location:
    findAddress(e.target.value)
  }

  // getData function:
  const getData = async () => {
    try {
      // Use service to get a specific Expense:
      const response = await getExpenseDetailsService(params.expenseId)
      // Set the states:
      setExpense(response.data)
      setNameInput(response.data.name)
      setPriceInput(response.data.price)
      setLocationInput(response.data.location)
      
      // If there are no coordinates, we will just show a pre-defined value for the map.
      // console.log(response.data.geoLocation);
      if(response.data.geoLocation.length !== 0) {
        setCenter(response.data.geoLocation)
        setMarkerPosition(response.data.geoLocation)
      } else {
        setCenter(barcelonaCoords)
        setMarkerPosition(null)
      }
      setIsLoading(false)
    } catch (error) {
      console.log(error);
    }
  }

  // useEffect to call getData when the component is mounted:
  useEffect(() => {
    getData()
  }, [])

  // Create a handler to delete the Expense:
  const handleDeleteExpense = async () => {
    try {
      setIsLoading(true)
      // Use a service to delete:
      await deleteExpenseService(params.expenseId)
      setIsLoading(false)
      navigate("/expenses")
    } catch (error) {
      console.log(error);
      navigate("/error")
    }
  }

  // Create a handler to show the edit form:
  const handleShowEditForm = () => {
    setIsEditing(true)
  }

  // Create a function to find an address, using the Nominatim maps api:
  const findAddress = async(locationInputed) => {
    try {
      let url = `https://nominatim.openstreetmap.org/search?format=json&limit=3&q=${locationInputed}`
      const response = await axios.get(url)
      // console.log(response.data)
      let addressArray = response.data
      console.log(addressArray);
      // Set the state with the results:
      setSearchLocationResults(addressArray)
    } catch (error) {
      console.log(error);
    }
  }

  
  // Create a function to handle the click on a selected location:
  const handleSelectedLocation = (chosenLocation) => {
    // console.log(chosenLocation.lat, chosenLocation.lon)
    setCoordinates([Number(chosenLocation.lat), Number(chosenLocation.lon)])

  }

  // Create a handler to edit the Expense:
  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log("Testing updating an Expense");
    try {
      // Get the previous results:
      setIsLoading(true)
      // const responsePrevious = await getExpenseDetailsService(params.expenseId)
      // console.log(responsePrevious)
      let expense;
      if (coordinates.length !== 0 && locationInput !== "") {
        // Create an object with the Expense state values:
        expense = {
          name: nameInput,
          price: priceInput,
          location: locationInput,
          geoLocation: coordinates
        }
      } else {
        expense = {
          name: nameInput,
          price: priceInput,
          location: "",
          geoLocation: [] 
        }
      }
    
      // console.log(expense);
      // Use a service to edit the Expense (and it will return the updated Expense):
      const response = await editExpenseService(params.expenseId, expense)
      // console.log("Document updated");
      // Update states:
      setExpense(response.data)
      setNameInput(response.data.name)
      setPriceInput(response.data.price)
      // Set the map marker depending if there is geoLocation or not:
      if(response.data.geoLocation.length !== 0) {
        setCenter(response.data.geoLocation)
        setMarkerPosition(response.data.geoLocation)
      } else {
        setCenter(barcelonaCoords)
      }
    
      // If all successful we can reset the states:
      setIsLoading(false)
      setIsEditing(false)
      setErrorMessage("")
      // Call getData() to show updated Expense:
      getData()
    } catch (error) {
      // If we get a 400 error we can show a message:
      setIsLoading(false)
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage)
      } else {
        // If the error is not 400 we will redirect to the Error page:
        navigate("/error");
      }
    }
  }  

  // Use a check clause for when isLoading
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
      <div>
        
        {!isEditing && <div className="expense-details-container">
            <div className="expense-details-container-header">
              <h1>{expense.name}</h1>
              <h3>€{expense.price}</h3>
            </div>
            <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              { markerPosition !== null && <Marker position={markerPosition} /> }

            </MapContainer>
            <div className="expense-details-container-buttons">
              <button className="expense-details-container-buttons-delete" onClick={handleDeleteExpense}>Delete</button>
              <button className="expense-details-container-buttons-edit" onClick={handleShowEditForm}>Edit</button>
              <button className="expense-details-container-buttons-back"><Link to={"/expenses"}>Back</Link></button>
            </div>
          </div>}
          {isEditing && 
          <div>
          <form onSubmit={handleSubmit} className="expenses-form">
          <h2>Edit {expense.name} expense</h2>
          <div className="expenses-form-each-input">
            <label htmlFor="name">Name: </label>
            <input type="text" name="name" maxLength="18" onChange={handleNameChange} value={nameInput} autoComplete="off"/>
          </div>
          <div className="expenses-form-each-input">
            <label htmlFor="price">Price: </label>
            <input step=".01" max="10000000" type="number" name="price" onChange={handlePriceChange} value={priceInput} />
          </div>
          <div className="expenses-form-each-input">
            <label htmlFor="location">Location: </label>
            <input type="text" name="location" onChange={handleGeoLocationChange} value={locationInput}/>
          </div>
          
          
          <br />
          <div><button className="expenses-form-button" type="submit">Update</button>
            <button className="expenses-form-button expenses-form-button-back"><Link to={"/expenses"}>Back</Link></button>
            {errorMessage && <p style={{color: "red"}}>{errorMessage}</p>}
          </div>

        </form>
        <div>
            {searchLocationResults && 
            <div className="eachLocation-container">
              {searchLocationResults.map((eachLocation, index) => {
                return (
                  <div key={index} className="eachLocation">
                    <p onClick={() => handleSelectedLocation(eachLocation)}>{eachLocation.display_name}</p>
                  </div>
                )
              })}
              </div>
            }
          </div>
          
        </div>
        }
      </div>
    </div>
  )
}

export default ExpensesDetails