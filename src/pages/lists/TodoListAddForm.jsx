import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createTodoListService } from "../../services/todoLists.services"


function TodoListAddForm() {
  const navigate = useNavigate()

  // Create state for the name input:
  const [nameInput, setNameInput] = useState("")

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
    } catch (error) {
      console.log(error)
      navigate("/error")
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
    </div>
  )
}

export default TodoListAddForm