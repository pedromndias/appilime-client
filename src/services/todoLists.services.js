//* This is where we will code the services for the Todo Lists routes:
// Import the service:
import service from "./config.services"

// Create a function to get all the Todo Lists. Note how we use service (imported) as its base:
const getAllTodoListsService = () => {
    return service.get("/lists")
}

// Create a function to post a new Todo List. Note the object parameter it takes (the file that makes the call sends a property "name" as an argument):
const createTodoListService = (name) => {
    return service.post("/lists/create", {name})
}

// Create a function to get the details of a Todo List:
const getTodoListDetailsService = (todoListId) => {
    return service.get(`/lists/${todoListId}`)
}

// Create a function to get all the todos from a specific list:
const getAllTodosFromList = (todoListId) => {
    return service.get(`/todo/${todoListId}`)
}

// Create a function to edit the name of a Todo List by its Id:
const editTodoListService = (todoListId, name) => {
    return service.patch(`/lists/${todoListId}`, {name})
}

// Create a function to delete a Todo List by its Id:
const deleteTodoListService = (todoListId) => {
    return service.delete(`/lists/${todoListId}`)
}

// Create a function to change the isChecked status of a single Todo:
const changeTodoIsCheckedService = (todoId, isChecked) => {
    return service.patch(`/todo/${todoId}`, {isChecked})
}

// Create a function to delete the todos that are checked from a specific List:
const deleteCheckedTodosService = (todoListId) => {
    return service.delete(`/todo/${todoListId}`)
}

// Create a function to create a new single Todo:
const createSingleTodo = (todoListId, name) => {
    return service.post(`/todo/${todoListId}`, {name})
}

// Export all services:
export {
    getAllTodoListsService,
    createTodoListService,
    getTodoListDetailsService,
    getAllTodosFromList,
    deleteTodoListService,
    editTodoListService,
    changeTodoIsCheckedService,
    deleteCheckedTodosService,
    createSingleTodo
}