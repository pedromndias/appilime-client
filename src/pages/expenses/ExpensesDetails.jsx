
import { useEffect, useState } from "react";
// Make use of react-leaflet to render maps:
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import ClickMarker from "./ClickMarker";
import { useNavigate, useParams } from "react-router-dom";
import { deleteExpenseService, editExpenseService, getExpenseDetailsService } from "../../services/expenses.services";
import ExpensesForm from "./ExpensesForm";


function ExpensesDetails() {
  // Let's create state for the map:
  const [ center, setCenter ] = useState([51.505, -0.09])
  // Let's create state for the clicked position:
  const [clickedPosition, setClickedPosition] = useState(null);
  let barcelonaCoords = [41.390106945633164, 2.1766662597656254]
  
  const navigate = useNavigate()
  const params = useParams()

  // States:
  const [expense, setExpense] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [nameInput, setNameInput] = useState("")
  const [priceInput, setPriceInput] = useState(0)
  const [geoLocationInput, setGeoLocationInput] = useState([])
  // State for an error message:
  const [errorMessage, setErrorMessage] = useState("")

  // Create handlers for each input change:
  const handleNameChange = (e) => setNameInput(e.target.value)
  const handlePriceChange = (e) => setPriceInput(e.target.value)
  const handleGeoLocationChange = (e) => setGeoLocationInput(e.target.value)

  // getData function:
  const getData = async () => {
    try {
      // Use service to get a specific Expense:
      const response = await getExpenseDetailsService(params.expenseId)
      // Set the states:
      setExpense(response.data)
      setNameInput(response.data.name)
      setPriceInput(response.data.price)
      setGeoLocationInput(response.data.geoLocation)
      // If there are no coordinates, we will just show a pre-defined value for the map.
      // console.log(response.data.geoLocation);
      if(response.data.geoLocation.length !== 0) {
        setCenter(response.data.geoLocation)
        setClickedPosition(response.data.geoLocation)
      } else {
        setCenter([51.505, -0.09])
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

  // Create a handler to edit the Expense:
  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log("Testing updating an Expense");
    try {
      setIsLoading(true)
      // Create an object with the Expense state values:
      const expense = {
        name: nameInput,
        price: priceInput,
        geoLocation: geoLocationInput
      }
      // console.log(expense);
      // Use a service to edit the Expense:
      await editExpenseService(params.expenseId, expense)
      console.log("Document updated");
      // Show updated Expense:
      const response = await getExpenseDetailsService(params.expenseId)
      // Update states:
      setExpense(response.data)
      setNameInput(response.data.name)
      setPriceInput(response.data.price)
      setGeoLocationInput(response.data.geoLocation)
      if(response.data.geoLocation.length !== 0) {
        setCenter(response.data.geoLocation)
      } else {
        setCenter([51.505, -0.09])
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
          {/* Invoke the ClickMarket component */}
          <ClickMarker setClickedPosition={setClickedPosition} />
          { clickedPosition !== null && <Marker position={clickedPosition} /> }

        </MapContainer>
        <button onClick={handleDeleteExpense}>Delete</button>
        <button onClick={handleShowEditForm}>Edit</button>
      </div>}
      {isEditing && 
      <div>
        <ExpensesForm 
          nameInput={nameInput} priceInput={priceInput} geoLocationInput={geoLocationInput} handleSubmit={handleSubmit} handleNameChange={handleNameChange} handlePriceChange={handlePriceChange} handleGeoLocationChange={handleGeoLocationChange} errorMessage={errorMessage} isEditingAnExpense={true}
        />
      </div>}
      
    </div>
  )
}

export default ExpensesDetails