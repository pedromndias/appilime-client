import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createExpenseService } from "../../services/expenses.services"
import axios from "axios"
import { GridLoader } from "react-spinners"
import Sidebar from "../../components/navigation/Sidebar"
import { Link } from "react-router-dom"

function ExpensesAddNew() {
  const navigate = useNavigate()

  // Create state for each input:
  const [nameInput, setNameInput] = useState("")
  const [priceInput, setPriceInput] = useState(0)
  const [locationInput, setLocationInput] = useState("")
  // State for an error message:
  const [errorMessage, setErrorMessage] = useState("")
  
  const [isLoading, setIsLoading] = useState(false)
  // Create state for the search location results:
  const [searchLocationResults, setSearchLocationResults] = useState(null)
  // Create state for the coordinates:
  const [coordinates, setCoordinates] = useState([])

  // Create handlers for name and price input change:
  const handleNameChange = (e) => setNameInput(e.target.value)
  const handlePriceChange = (e) => {
    // let number2Dec = Number(e.target.value).toFixed(2)
    // const valueInt = number2Dec.split(".")[0]
    // const valueDec = number2Dec.split(".")[1]
    // setPriceInput(valueInt + "." + valueDec.slice(0, 2))
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
      <div className="container-with-sidebar">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div>
          <form onSubmit={handleSubmit} className="expenses-form">
          <h2>Add a new expense</h2>
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
          <div>
            <button className="expenses-form-button" type="submit">+Add</button>
            <button className="expenses-form-button expenses-form-button-back"><Link to={"/expenses"}>Back</Link></button>
            {errorMessage && <p style={{color: "red"}}>{errorMessage}</p>}
          </div>

        </form>
        <div>
          {/* In case we have some element on the searchLocationResults array, we will render them on the page. If we click one of them it will call a handler to select the coordinates of that specific location */}
            {searchLocationResults && 
            <div className="eachLocation-container">
              {searchLocationResults.map((eachLocation, index) => {
                // console.log(eachLocation)
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
    </div>
      </div>
    </div>
  )
}

export default ExpensesAddNew