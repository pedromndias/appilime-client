import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { createTodoListService } from "../../services/todoLists.services"
import Sidebar from "../../components/navigation/Sidebar"


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
    <div className="container-with-sidebar">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="add-new-list-container">
        <h2>New To-Do List</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name: </label>
          <input type="text" maxLength="20" name="name" onChange={handleNameChange} value={nameInput} autoComplete="off"/>
          <div className="add-new-list-button-container">
            <button className="add-new-list-button add-new-list-button-normal" type="submit">+ Add List</button>
          <Link className="list-details-button-link" to={"/lists"}><button className="list-details-button list-details-button-back">Back</button></Link>
          </div>
          
        </form>
        {errorMessage && <p style={{color: "red"}}>{errorMessage}</p>}
      </div>
    </div>
  )
}

export default TodoListAddForm