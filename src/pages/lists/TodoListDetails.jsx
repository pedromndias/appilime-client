import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { changeTodoIsCheckedService, createSingleTodo, deleteCheckedTodosService, deleteTodoListService, editTodoListService, getAllTodosFromList, getTodoListDetailsService } from "../../services/todoLists.services";



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
  // State for an error message:
  const [errorMessage, setErrorMessage] = useState("")

  // Create function to call the Backend and get data:
  const getData = async () =>  {
    try {
      // Get the List with the id params.todoListId:
      // const listResponse = await service.get(`http://localhost:5005/api/lists/${params.todoListId}`)
      // Use a service to get the details (note how we send the params.todoListId as an argument):
      const listResponse = await getTodoListDetailsService(params.todoListId)
      // console.log(listResponse.data);
      setTodoList(listResponse.data)
      // Get the todos that have this list as the list property:
      // const todosResponse = await service.get(`http://localhost:5005/api/todo/${params.todoListId}`)
      // Use a service to get the todos that have this list as the list property:
      const todosResponse = await getAllTodosFromList(params.todoListId)
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

  // Create handler to show the input to edit the Todo List name:
  const handleEditTodoList = () => {
    setIsNameInputShowing(true)
  }

  // Create handler to update the Todo List name:
  const handleNameInputSubmit = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      // await service.patch(`http://localhost:5005/api/lists/${todoList._id}`, {name: todoList.name})
      // Use a service to send the data to our Backend:
      await editTodoListService(todoList._id, todoList.name)
      setIsLoading(false)
      setIsNameInputShowing(false)
      setErrorMessage("")
    } catch (error) {
      // If we get a 400 error (bad request because the client sent the wrong data), we can specify the error message that comes from the Backend validation:
      setIsLoading(false)
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage)
      } else {
        // If the error is not 400 we will redirect to the Error page:
        navigate("/error");
      }
    }

  }

  // Create handler to delete the Todo List:
  const handleDeleteTodoList = async () => {
    try {
      
      // await service.delete(`http://localhost:5005/api/lists/${todoList._id}`)
      // Use a service to delete a Todo List by its Id:
      await deleteTodoListService(todoList._id)
      navigate("/lists")
    } catch (error) {
      console.log(error)
      navigate("/error")
    }
  }

  // Create handler to change the isChecked status of a single Todo:
  const handleIsChecked = async (event, todoId) => {
    // console.log(event.target.checked)
    // console.log(todoId);
    try {
      // await service.patch(`http://localhost:5005/api/todo/${todoId}`, {isChecked: event.target.checked})
      // Use a service to call our backend:
      await changeTodoIsCheckedService(todoId, event.target.checked)
    } catch (error) {
      console.log(error)
      navigate("/error")
    }
  }

  // Create handler to delete checked todos:
  const handleDeleteCheckedTodos = async () => {
    try {
      // Delete the todos that are checked and have todoList._id as its list:
      // await service.delete(`http://localhost:5005/api/todo/${todoList._id}`)
      // Use a service to delete a the checked todos with that list Id:
      await deleteCheckedTodosService(todoList._id)
      // Set the TodosFromList as the new updated Todos List (by using a service):
      // const todosResponse = await service.get(`http://localhost:5005/api/todo/${todoList._id}`)
      const todosResponse = await getAllTodosFromList(todoList._id)
      // console.log(todosResponse.data);
      setTodosFromList(todosResponse.data)
      // console.log("Todos updated on this list")
      
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
      // await service.post(`http://localhost:5005/api/todo/${todoList._id}`, {name: newSingleTodoName})
      // Use a service to create a single todo:
      await createSingleTodo(todoList._id, newSingleTodoName)
      // Update the list on the page (use a service to get the updated todos):
      // const todosResponse = await service.get(`http://localhost:5005/api/todo/${todoList._id}`)
      const todosResponse = await getAllTodosFromList(todoList._id)
      setTodosFromList(todosResponse.data)
      setIsLoading(false)
      // Hide the input and reset the newSingleTodoName state:
      setIsNewTodoInputShowing(false)
      setNewSingleTodoName("")
      // Hide any possible error message:
      setErrorMessage("")
    } catch (error) {
      setIsLoading(false)
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage)
      } else {
        // If the error is not 400 we will redirect to the Error page:
        navigate("/error");
      }
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
                {!isNameInputShowing && (!isNewTodoInputShowing &&<input type="checkbox" name="todo" defaultChecked={eachTodo.isChecked} onChange={(event) => handleIsChecked(event, eachTodo._id)}/>)}
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
        {errorMessage && <p style={{color: "red"}}>{errorMessage}</p>}
      </div>
    </div>
  )
}

export default TodoListDetails