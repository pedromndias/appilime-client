import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createTodoListService } from "../../services/todoLists.services"


function TodoListAddForm() {
  const navigate = useNavigate()

  // Create state for the name input:
  const [nameInput, setNameInput] = useState("")
  // State for an error message:
  const [errorMessage, setErrorMessage] = useState("")

  // Create a handler for the name input change:
  const handleNameChange = (e) => setNameInput(e.target.value)

  // Create a handler to submit the form:
  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log("Testing handleSubmit");
    try {
      // await service.post(`http://localhost:5005/api/lists/create`, {name: nameInput})
      // Use a service to make the post call:
      await createTodoListService(nameInput)
      navigate("/lists")
      setErrorMessage("")
    } catch (error) {
      // If we get a 400 error (bad request because the cliente sent the wrong data), we can specify the error message that comes from the Backend validation:
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
      <h2>New To-Do List</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input type="text" name="name" onChange={handleNameChange} value={nameInput} autoComplete="off"/>

        <button type="submit">+ Add List</button>

      </form>
      {errorMessage && <p style={{color: "red"}}>{errorMessage}</p>}
    </div>
  )
}

export default TodoListAddForm