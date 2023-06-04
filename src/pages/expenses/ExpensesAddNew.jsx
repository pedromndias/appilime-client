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
  const [geoLocationInput, setGeoLocationInput] = useState([])
  // State for an error message:
  const [errorMessage, setErrorMessage] = useState("")
  // Create state for when it is loading:
  const [isLoading, setIsLoading] = useState(false)
  // Create state for the search location results:
  const [searchLocationResults, setSearchLocationResults] = useState(null)
  // Create state for the location selected:
  const [selectedLocation, setSelectedLocation] = useState(null)
  // Create state for the coordinates:
  const [coordinates, setCoordinates] = useState([])

  // Create handlers for each input change:
  const handleNameChange = (e) => setNameInput(e.target.value)
  const handlePriceChange = (e) => setPriceInput(e.target.value)
  const handleGeoLocationChange = (e) => {
    const locationInputed = e.target.value
    findAddress(locationInputed)

    setGeoLocationInput(e.target.value)
  }
  // Create a handler to submit the form:
  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log("Testing expense submit");
    try {
      setIsLoading(true)
      // Create an object with the Expense state values:
      const expense = {
        name: nameInput,
        price: priceInput,
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
      console.log(addressArray);
      // Set the state with the results:
      setSearchLocationResults(addressArray)
    } catch (error) {
      console.log(error);
    }
  }

  // Create a function to handle the click on a selected location:
  const handleSelectedLocation = (eachLocation) => {
    console.log(eachLocation.lat, eachLocation.lon)
    setCoordinates([Number(eachLocation.lat), Number(eachLocation.lon)])
    console.log(coordinates);
    // console.log(eachLocation.lat, eachLocation.lon);
  }

  // Use a check clause for when isLoading
  if (isLoading) {
    return <h3>...Loading</h3>
  }

  return (
    <div>
      <h2>ExpensesAddNew</h2>
      <ExpensesForm 
        nameInput={nameInput} priceInput={priceInput} geoLocationInput={geoLocationInput} handleSubmit={handleSubmit} handleNameChange={handleNameChange} handlePriceChange={handlePriceChange} handleGeoLocationChange={handleGeoLocationChange} errorMessage={errorMessage} isCreatingAnExpense={true} searchLocationResults={searchLocationResults} selectedLocation={selectedLocation} handleSelectedLocation={handleSelectedLocation}
        setSelectedLocation={setSelectedLocation}
      />
    </div>
  )
}

export default ExpensesAddNew