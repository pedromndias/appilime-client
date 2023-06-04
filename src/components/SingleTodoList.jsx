import { useEffect, useState } from "react"
import { getAllTodosFromList, getTodoListDetailsService } from "../services/todoLists.services"

function SingleTodoList(props) {
  const {todoListId} = props

  // Create states:
  const [todoList, setTodoList] = useState(null)
  const [todosFromList, setTodosFromList] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Create function to call the Backend and get data:
  const getData = async () => {
    try {
      // Use a service to get the details of this list:
      const listResponse = await getTodoListDetailsService(todoListId)
      // console.log(listResponse.data);
      setTodoList(listResponse.data)
      // Use a service to get the todos that have this list as the list property:
      const todosResponse = await getAllTodosFromList(todoListId)
      // console.log(todosResponse.data);
      setTodosFromList(todosResponse.data)
      setIsLoading(false)
    } catch(error) {
      console.log(error);
    }
  }

  // Create useEffect to call the getData function when the component is mounted:
  useEffect(() => {
    getData()
  }, [])

  // Create a check clause for when it isLoading:
  if (isLoading) {
    return <h3>...Loading</h3>
  }
  
  return (
    <div className="singleTodoList">
      <h2>{todoList.name}</h2>
      <div className="singleTodoList-container">
        {todosFromList.map(eachTodo => {
          return (
            <h5 key={eachTodo._id}>{eachTodo.name}</h5>
          )
        })}
      </div>
    </div>
  )
}

export default SingleTodoList