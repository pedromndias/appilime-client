import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createExpenseService } from "../../services/expenses.services"
import ExpensesForm from "./ExpensesForm"

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

  // Create handlers for each input change:
  const handleNameChange = (e) => setNameInput(e.target.value)
  const handlePriceChange = (e) => setPriceInput(e.target.value)
  const handleGeoLocationChange = (e) => setGeoLocationInput(e.target.value)

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
        geoLocation: geoLocationInput
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

  // Use a check clause for when isLoading
  if (isLoading) {
    return <h3>...Loading</h3>
  }

  return (
    <div>
      <h2>ExpensesAddNew</h2>
      <ExpensesForm 
        nameInput={nameInput} priceInput={priceInput} geoLocationInput={geoLocationInput} handleSubmit={handleSubmit} handleNameChange={handleNameChange} handlePriceChange={handlePriceChange} handleGeoLocationChange={handleGeoLocationChange} errorMessage={errorMessage} isCreatingAnExpense={true}
      />
    </div>
  )
}

export default ExpensesAddNew