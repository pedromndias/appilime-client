
import { useEffect, useState } from "react";
// Make use of react-leaflet to render maps:
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useNavigate, useParams } from "react-router-dom";
import { deleteExpenseService, editExpenseService, getExpenseDetailsService } from "../../services/expenses.services";
import ExpensesForm from "./ExpensesForm";
import axios from "axios";


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
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [nameInput, setNameInput] = useState("")
  const [priceInput, setPriceInput] = useState(0)
  const [locationInput, setLocationInput] = useState("")
  // State for an error message:
  const [errorMessage, setErrorMessage] = useState("")
  // Create state for the search location results:
  const [searchLocationResults, setSearchLocationResults] = useState(null)
  // Create state for the coordinates:
  const [coordinates, setCoordinates] = useState([])

  // Create handlers for each input change:
  const handleNameChange = (e) => setNameInput(e.target.value)
  const handlePriceChange = (e) => setPriceInput(e.target.value)
  const handleGeoLocationChange = (e) => {
    setLocationInput(e.target.value)
    const locationInputed = e.target.value
    findAddress(locationInputed)
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

  // todo show already the 3 map option when editing: Ask Jorge
  // Create a handler to show the edit form:
  const handleShowEditForm = () => {
    setIsEditing(true)
  }

  // Create a variable to get the name of the location when editing the Expense. Note that the geoLocationInput sent the the ExpensesForm will have the name of the location and not the coordinates, it is easier to manipulate as a user.
  // let locationName = ""

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
  const handleSelectedLocation = (eachLocation) => {
    // console.log(eachLocation.lat, eachLocation.lon)
    setCoordinates([Number(eachLocation.lat), Number(eachLocation.lon)])
    // locationName = eachLocation.display_name

  }

  // Create a handler to edit the Expense:
  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log("Testing updating an Expense");
    try {
      // Get the previous results:
      setIsLoading(true)
      const responsePrevious = await getExpenseDetailsService(params.expenseId)
      console.log(responsePrevious)
      // Check if there were coordinates inputed:
      let expense;
      if (coordinates.length !== 0) {
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
          location: locationInput,
          geoLocation: responsePrevious.data.geoLocation
        }
      }
    
      
      // console.log(expense);
      // Use a service to edit the Expense (and it will return the updated Expense):
      const response = await editExpenseService(params.expenseId, expense)
      console.log("Document updated");
      // Update states:
      setExpense(response.data)
      setNameInput(response.data.name)
      setPriceInput(response.data.price)
      
      if(response.data.geoLocation.length !== 0) {
        setCenter(response.data.geoLocation)
        setMarkerPosition(response.data.geoLocation)
      } else {
        setCenter(coordinates)
        setMarkerPosition(coordinates)
      }
      // If successful we can show the details again:
      setIsLoading(false)
      setIsEditing(false)
      setErrorMessage("")
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
    return <h3>...Loading</h3>
  }

  return (
    <div>
      
      {!isEditing && <div className="expense-details-container">
        <h2>{expense.name}</h2>
        <h3>€{expense.price}</h3>
        <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          { markerPosition !== null && <Marker position={markerPosition} /> }

        </MapContainer>
        <button onClick={handleDeleteExpense}>Delete</button>
        <button onClick={handleShowEditForm}>Edit</button>
      </div>}
      {isEditing && 
      <div>
        <ExpensesForm 
          nameInput={nameInput} priceInput={priceInput} locationInput={locationInput} handleSubmit={handleSubmit} handleNameChange={handleNameChange} handlePriceChange={handlePriceChange} handleGeoLocationChange={handleGeoLocationChange} errorMessage={errorMessage} isEditingAnExpense={true} searchLocationResults={searchLocationResults} handleSelectedLocation={handleSelectedLocation}
        />
      </div>}
      
    </div>
  )
}

export default ExpensesDetails