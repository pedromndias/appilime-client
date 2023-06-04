//* This is where we will code the services for the Expenses routes:
// Import the service:
import service from "./config.services"

// Create a function to get all the Expenses:
const getAllExpensesService = () => {
    return service.get("/expenses")
}

// Create a function to post a new Expense:
const createExpenseService = (newExpense) => {
    return service.post("/expenses/create", newExpense)
}

// Create a function to get the details of an Expense:
const getExpenseDetailsService = (expenseId) => {
    return service.get(`/expenses/${expenseId}`)
}

// Create a function to delete an Expense by its Id:
const deleteExpenseService = (expenseId) => {
    return service.delete(`/expenses/${expenseId}`)
}

// Create a function to edit an Expense by its Id:
const editExpenseService = (expenseId, updatedExpense) => {
    return service.put(`/expenses/${expenseId}`, updatedExpense)
}

// Create a function to delete all Expenses:
const deleteAllExpensesService = () => {
    return service.delete("/expenses")
}

export {
    getAllExpensesService,
    createExpenseService,
    getExpenseDetailsService,
    deleteExpenseService,
    editExpenseService,
    deleteAllExpensesService
}