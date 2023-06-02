import { useState } from "react"
import service from "../../services/config.services"
import { useNavigate } from "react-router-dom"


function TodoListAddForm() {
  const navigate = useNavigate()

  // Create state for the name input:
  const [nameInput, setNameInput] = useState("")

  // Create a handler for the name input change:
  const handleNameChange = (e) => setNameInput(e.target.value)

  // Create a handler to submit the form:
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("Testing handleSubmit");
    await service.post(`http://localhost:5005/api/lists/create`, {name: nameInput})
    navigate("/lists")
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