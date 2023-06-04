import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createExpenseService } from "../../services/expenses.services"
import ExpensesForm from "./ExpensesForm"
import axios from "axios"

function ExpensesAddNew() {
  const navigate = useNavigate()

  // Create state for each input:
  const [nameInput, setNameInput] = useState("")
  const [priceInput, setPriceInput] = useState(0)
  const [locationInput, setLocationInput] = useState("")
  // State for an error message:
  const [errorMessage, setErrorMessage] = useState("")
  // Create state for when it is loading:
  const [isLoading, setIsLoading] = useState(false)
  // Create state for the search location results:
  const [searchLocationResults, setSearchLocationResults] = useState(null)
  // Create state for the coordinates:
  const [coordinates, setCoordinates] = useState([])

  // Create handlers for name and price input change:
  const handleNameChange = (e) => setNameInput(e.target.value)
  const handlePriceChange = (e) => {
    setPriceInput(e.target.value)
  }
  // Create state for the geoLocation change (it will update the input value and will call a findAddress function with the value of the input)
  const handleGeoLocationChange = (e) => {
    // console.log(e.target.value);
    setLocationInput(e.target.value)
    const locationInputed = e.target.value
    findAddress(locationInputed)
  }
  
  // Create a handler to submit the form:
  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log("Testing expense submit");
    try {
      // Do not allow to store a price with more than 2 decimals:
      let price = Number(priceInput).toFixed(2)
      setIsLoading(true)
      // Create an object with the Expense state values:
      const expense = {
        name: nameInput,
        price: price,
        location: locationInput,
        geoLocation: coordinates
      }
      // Call the service to create a new Expense:
      await createExpenseService(expense)
      console.log("Document created");
      // If successful we can redirect to the Expenses page:
      setIsLoading(false)
      setErrorMessage("")
      navigate("/expenses")
    } catch (error) {
      setIsLoading(false)
      // If we get a 400 error we can show a message:
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage)
      } else {
        // If the error is not 400 we will redirect to the Error page:
        navigate("/error");
      }
    }
  }

  // Create a function to find an address, using the Nominatim maps api:
  const findAddress = async(locationInputed) => {
    try {
      let url = `https://nominatim.openstreetmap.org/search?format=json&limit=3&q=${locationInputed}`
      const response = await axios.get(url)
      // console.log(response.data)
      let addressArray = response.data
      // Set the state with the results:
      setSearchLocationResults(addressArray)
    } catch (error) {
      console.log(error);
    }
  }

  // Create a function to handle the click on a selected location:
  const handleSelectedLocation = (eachLocation) => {
    // We get the lattitude and longitude of that location and update the coordinates state. Note the Number method so we don't save them as strings:
    // console.log(eachLocation.lat, eachLocation.lon)
    setCoordinates([Number(eachLocation.lat), Number(eachLocation.lon)])
    // console.log(coordinates) // Still not updated here!
  }

  // Use a check clause for when isLoading
  if (isLoading) {
    return <h3>...Loading</h3>
  }

  return (
    <div>
      <h2>ExpensesAddNew</h2>
      <ExpensesForm 
        nameInput={nameInput} priceInput={priceInput} locationInput={locationInput} handleSubmit={handleSubmit} handleNameChange={handleNameChange} handlePriceChange={handlePriceChange} handleGeoLocationChange={handleGeoLocationChange} errorMessage={errorMessage} isCreatingAnExpense={true} searchLocationResults={searchLocationResults} handleSelectedLocation={handleSelectedLocation}
        
      />
    </div>
  )
}

export default ExpensesAddNew