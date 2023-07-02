import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { getAllTodoListsService } from "../../services/todoLists.services"
import SingleTodoList from "../../components/SingleTodoList"
import { GridLoader } from "react-spinners"
import Sidebar from "../../components/navigation/Sidebar"

function TodoList() {
  const navigate = useNavigate()

  //* Get all the Todos List from the Backend:
  // Create state for the Todos List:
  const [todosList, setTodosList] = useState(null)
  // Create state if the data is Loading:
  const [isLoading, setIsLoading] = useState(true)

  // Create function to call the Backend:
  const getData =  async () => {
    try {
      // Use a service to get all the data, change isLoading to false and set TodosList as its response.data:
      const response = await getAllTodoListsService()
      // console.log(response);
      setTodosList(response.data)
      setIsLoading(false)
    } catch (error) {
      // console.log(error);
      navigate("/error")
    }
  }

  // useEffect to call the function:
  useEffect(() => {
    getData()
  }, [])

  // Create a check clause if we are still loading (and give time to the Backend to return the data):
  if (isLoading) {
    return (
      <div className="spinner-container">
        <GridLoader color="rgba(0, 0, 0, 0.62)" size={50}/>
      </div>
    )
  }

  return (
    <div className="container-with-sidebar">
      <div className="sidebar allTodoLists-sidebar">
        <Sidebar />
      </div>
      <div className="allTodoLists">
        <div className="allTodoLists-header">
          <h1>To-Do Lists</h1>
            <Link to={"/lists/create"}>
          <div className="add-list-link">
              + Add List
          </div>
              </Link>
        </div>
        <div className="allTodoLists-container">
        {todosList.map(eachTodoList => {
          return (
            <div className="eachTodoList" key={eachTodoList._id}>
              <Link to={`/lists/${eachTodoList._id}`}>
              <SingleTodoList
                  todoListId={eachTodoList._id}
              />
              </Link>
              
            </div>
          )
        })}
        </div>
        
      </div>
    </div>
  )
}

export default TodoList