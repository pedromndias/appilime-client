import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import service from "../../services/config.services";



function TodoListDetails() {
  const navigate = useNavigate()

  // Get the params:
  const params = useParams()
  // console.log(params);

  // Create state for one Todo List:
  const [todoList, setTodoList ] = useState(null)
  // Create state for isLoading:
  const [isLoading, setIsLoading] = useState(true)
  // Create state for all the todos within this List:
  const [todosFromList, setTodosFromList] = useState(null)
  // Create state for edit List name input:
  const [isNameInputShowing, setIsNameInputShowing] = useState(false)
  // Create state for the new Todo input:
  const [isNewTodoInputShowing, setIsNewTodoInputShowing] = useState(false)
  // Create state for the newly created Todo:
  const [newSingleTodoName, setNewSingleTodoName] = useState("")
  

  // Create function to call the Backend and get data:
  const getData = async () =>  {
    try {
      // Get the List with the id params.todoListId:
      const listResponse = await service.get(`http://localhost:5005/api/lists/${params.todoListId}`)
      // console.log(listResponse.data);
      setTodoList(listResponse.data)
      // Get the todos that have this list as the list property:
      const todosResponse = await service.get(`http://localhost:5005/api/todo/${params.todoListId}`)
      // console.log(todosResponse.data);
      setTodosFromList(todosResponse.data)
      setIsLoading(false)
    } catch (error) {
      console.log(error);
    }
  }

  // Create useEffect to call the getData function when the component is mounted:
  useEffect(() => {
    getData()
  }, [])

  // Create handler to edit the Todos List name (it will show the name input):
  const handleEditTodoList = () => {
    setIsNameInputShowing(true)
  }

  // Create handler to update the Todos List name:
  const handleNameInputSubmit = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      await service.patch(`http://localhost:5005/api/lists/${todoList._id}`, {name: todoList.name})
      setIsLoading(false)
      setIsNameInputShowing(false)
    } catch (error) {
      console.log(error)
    }

  }

  // Create handler to delete the Todos List:
  const handleDeleteTodoList = async () => {
    try {
      await service.delete(`http://localhost:5005/api/lists/${todoList._id}`)
      navigate("/lists")
    } catch (error) {
      console.log(error)
    }
    
  }

  // Create handler to change the isChecked status:
  const handleIsChecked = async (event, todoId) => {
    console.log(event.target.checked)
    console.log(todoId);
    try {
      await service.patch(`http://localhost:5005/api/todo/${todoId}`, {isChecked: event.target.checked})
    } catch (error) {
      console.log(error)
    }
  }

  // Create handler to delete checked todos:
  const handleDeleteCheckedTodos = async () => {
    try {
      // Delete the todos that are checked and have todoList._id as its list:
      await service.delete(`http://localhost:5005/api/todo/${todoList._id}`)
      // Set the TodosFromList as the new updated Todos List:
      const todosResponse = await service.get(`http://localhost:5005/api/todo/${todoList._id}`)
      // console.log(todosResponse.data);
      setTodosFromList(todosResponse.data)
      
    } catch (error) {
      console.log(error);
    }
  }

  // Create a handler to show the create new Todo input:
  const handleShowNewTodoInput = () => {
    setIsNewTodoInputShowing(true)
  }

  // Create a handler to create a new single Todo:
  const handleCreateNewTodo = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      // Create a new todo:
      await service.post(`http://localhost:5005/api/todo/${todoList._id}`, {name: newSingleTodoName})
      // Update the list on the page:
      const todosResponse = await service.get(`http://localhost:5005/api/todo/${todoList._id}`)
      setTodosFromList(todosResponse.data)
      setIsLoading(false)
      // Hide the input and reset the newSingleTodoName state:
      setIsNewTodoInputShowing(false)
      setNewSingleTodoName("")
    } catch (error) {
      console.log(error);
    }
  }

  // Create a check clause for when it isLoading:
  if (isLoading) {
    return <h3>...Loading</h3>
  }

  return (
    <div>
      <div>
        {!isNameInputShowing && <h2>{todoList.name}</h2>}
        {isNameInputShowing && <form onSubmit={handleNameInputSubmit}>
            <input type="text" value={todoList.name} onChange={(e) => setTodoList({...todoList, name: e.target.value})}/>
            <button type="submit">Update</button>
          </form>}
          {!isNameInputShowing && <button onClick={handleEditTodoList}>Edit</button>}
          {!isNameInputShowing && <button onClick={handleDeleteTodoList}>Delete</button>}
      </div>
      <div>
        {todosFromList.map(eachTodo => {
          return (
            <div key={eachTodo._id}>
              <form>
                <label htmlFor="todo">
                  <p>{eachTodo.name}</p>
                </label>
                {!isNameInputShowing && (!isNewTodoInputShowing &&<input type="checkbox" name="todo" onChange={(event) => handleIsChecked(event, eachTodo._id)}/>)}
              </form>
            </div>
          )
        })}
      </div>
      <div>
        {!isNameInputShowing && (!isNewTodoInputShowing && <button onClick={handleShowNewTodoInput}>1Add To-Do</button>)}
        
        {isNewTodoInputShowing && <form onSubmit={handleCreateNewTodo}>
          <input type="text" value={newSingleTodoName} onChange={(event) => setNewSingleTodoName(event.target.value)}/>
          <button type="submit">2Add To-Do</button>
          </form>}
        {!isNameInputShowing && (!isNewTodoInputShowing &&<button onClick={handleDeleteCheckedTodos}>Remove Done</button>)}
      </div>
      
    </div>
  )
}

export default TodoListDetails