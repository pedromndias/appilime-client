import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { getAllTodoListsService } from "../../services/todoLists.services"
import SingleTodoList from "../../components/SingleTodoList"

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
      setIsLoading(false)
      setTodosList(response.data)
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
    return <h3>...Loading</h3>
  }

  return (
    <div className="allTodoLists">
      <div className="allTodoLists-header">
        <h1>To-Do Lists</h1>
        <Link to={"/lists/create"}>+ Add List</Link>
      </div>
      <div className="allTodoLists-container">
      {todosList.map(eachTodoList => {
        return (
          <div className="eachTodoList" key={eachTodoList._id}>
            <Link className="eachTodoList-link" to={`/lists/${eachTodoList._id}`}>
            <SingleTodoList
                todoListId={eachTodoList._id}
            />
            </Link>
            
          </div>
        )
      })}
      </div>
      
    </div>
  )
}

export default TodoList