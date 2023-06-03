import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createExpenseService } from "../../services/expenses.services"

function ExpensesAddForm() {
  const navigate = useNavigate()

  // Create state for each input:
  const [nameInput, setNameInput] = useState("")
  const [priceInput, setPriceInput] = useState(0)
  const [geoLocationInput, setGeoLocationInput] = useState([])
  // State for an error message:
  const [errorMessage, setErrorMessage] = useState("")

  // Create handlers for each input change:
  const handleNameChange = (e) => setNameInput(e.target.value)
  const handlePriceChange = (e) => setPriceInput(e.target.value)
  const handleGeoLocationChange = (e) => setGeoLocationInput(e.target.value)

  // Create a handler to submit the form:
  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log("Testing expense submit");
    try {
      // Create an object with the Expense state values:
      const expense = {
        name: nameInput,
        price: priceInput,
        geoLocation: geoLocationInput
      }
      // Call the service to create a new Expense:
      await createExpenseService(expense)
      console.log("Document created");
      // If successful we can redirect to the Expenses page:
      setErrorMessage("")
      navigate("/expenses")
    } catch (error) {
      // If we get a 400 error we can show a message:
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage)
      } else {
        // If the error is not 400 we will redirect to the Error page:
        navigate("/error");
      }
    }
  }

  return (
    <div>
      <h2>ExpensesAddForm</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name: </label>
          <input type="text" name="name" onChange={handleNameChange} value={nameInput} autoComplete="off"/>
        </div>
        <div>
          <label htmlFor="price">Price: </label>
          <input type="number" name="price" onChange={handlePriceChange} value={priceInput} />
        </div>
        <div>
          <label htmlFor="location">Location: </label>
          <input type="text" name="location" onChange={handleGeoLocationChange} value={geoLocationInput}/>
        </div>
        <br />
        <button type="submit">+ Add</button>

        {errorMessage && <p style={{color: "red"}}>{errorMessage}</p>}

      </form>
      
    
    </div>
  )
}

export default ExpensesAddForm