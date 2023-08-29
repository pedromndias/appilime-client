import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { changeTodoIsCheckedService, createSingleTodo, deleteCheckedTodosService, deleteTodoListService, editTodoListService, getAllTodosFromList, getTodoListDetailsService } from "../../services/todoLists.services";
import { GridLoader } from "react-spinners"
import Sidebar from "../../components/navigation/Sidebar";


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
      // Use a service to get the details (note how we send the params.todoListId as an argument):
      const listResponse = await getTodoListDetailsService(params.todoListId)
      // console.log(listResponse.data);
      setTodoList(listResponse.data)
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
    // ? Since we can click both on the todo name and checkbox to send the isChecked value, we need to separate those events (the div or the checkbox):
    // Create a variable to then send it to the DB:
    let eventToSendToDB;
    // If the click is on the "father element" of the checkbox:
    if(event.target.children[1]) {
      // Manually toggle the checked value of the checkbox:
      event.target.children[1].checked = !event.target.children[1].checked
      // Assign it to our eventToSendToDB variable:
      eventToSendToDB = event.target.children[1].checked
      // console.log(event.target.children[1].checked, "father")
    } else {
      // In case we click directly on the checkbox, just assign the value to the variable:
      eventToSendToDB = event.target.checked
      // console.log(event.target.checked, "checkbox")
    }
    
    // console.log(todoId);
    try {
      // Use a service to call our backend:
      await changeTodoIsCheckedService(todoId, eventToSendToDB)
    } catch (error) {
      console.log(error)
      navigate("/error")
    }
  }

  // Create handler to delete checked todos:
  const handleDeleteCheckedTodos = async () => {
    try {
      // Use a service to delete a the checked todos with that list Id:
      await deleteCheckedTodosService(todoList._id)
      // Set the TodosFromList as the new updated Todos List (by using a service):
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
      <div className="list-details">
        <div>
          {!isNameInputShowing && <h2>{todoList.name}</h2>}
          {isNameInputShowing && <form onSubmit={handleNameInputSubmit}>
            <div className="edit-name-todo-container">
              <label htmlFor="edit-name-todo">Edit Name</label>
              <input type="text" id="edit-name-todo" maxLength="20" value={todoList.name} onChange={(e) => setTodoList({...todoList, name: e.target.value})}/>
            </div>
              
              <div className="edit-list-details-name-buttons">
                <button className="list-details-button list-details-button-normal"  type="submit">Update</button>
                <button className="list-details-button list-details-button-cancel"  onClick={() => setIsNameInputShowing(false)}>Cancel</button>
              </div>
              
            </form>}
            {(!isNewTodoInputShowing &&!isNameInputShowing) && <button className="list-details-button list-details-button-normal" onClick={handleEditTodoList}>Edit</button>}
            {(!isNewTodoInputShowing &&!isNameInputShowing) && <button className="list-details-button list-details-button-red"  onClick={handleDeleteTodoList}>Delete</button>}
        </div>
        <div className="list-details-all-todos">
          {todosFromList.map(eachTodo => {
            
            return (
              <div key={eachTodo._id}>
                <form>
                  <div className="list-details-single-todo" onClick={(event) => handleIsChecked(event, eachTodo._id)}>
                    <label htmlFor={eachTodo._id}>
                      {eachTodo.name}
                    </label>
                    {!isNameInputShowing && (!isNewTodoInputShowing &&<input type="checkbox" id={eachTodo._id} name="todo" defaultChecked={eachTodo.isChecked} />)}
                  </div>
                </form>
              </div>
            )
          })}
        </div>
        <div>
          {!isNameInputShowing && (!isNewTodoInputShowing && <button className="list-details-button list-details-button-normal" onClick={handleShowNewTodoInput}>Add To-Do</button>)}
          
          {isNewTodoInputShowing && <form onSubmit={handleCreateNewTodo}>
            <div className="new-todo-container">
              <label htmlFor="new-todo">New To-Do</label>
              <input id="new-todo" type="text" maxLength="25" value={newSingleTodoName} onChange={(event) => setNewSingleTodoName(event.target.value)}/>
            </div>
            
            <div className="edit-list-details-name-buttons">
              <button className="list-details-button list-details-button-normal" type="submit">Add To-Do</button>
              <button className="list-details-button list-details-button-cancel" onClick={() => setIsNewTodoInputShowing(false)}>Cancel</button>
            </div>
            </form>}
          {!isNameInputShowing && (!isNewTodoInputShowing &&<button className="list-details-button list-details-button-red" onClick={handleDeleteCheckedTodos}>Remove Done</button>)}
          <div className="list-details-button-back-container">
            <button className="list-details-button list-details-button-back"><Link to={"/lists"}>Back</Link></button>
          </div>
          
          {errorMessage && <p style={{color: "red"}}>{errorMessage}</p>}
        </div>
        
      </div>
      
    </div>
  )
}

export default TodoListDetails