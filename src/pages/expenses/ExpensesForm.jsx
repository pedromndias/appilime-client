//* This is a form component that will be reused (create new Expense and edit an Expense)

import { Link } from "react-router-dom"
import Sidebar from "../../components/navigation/Sidebar"

function ExpensesForm(props) {
    const {expense, nameInput, priceInput, locationInput, handleSubmit, handleNameChange, handlePriceChange, handleGeoLocationChange, errorMessage, isEditingAnExpense, isCreatingAnExpense,searchLocationResults, handleSelectedLocation} = props
  return (
    <div className="container-with-sidebar">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div>
          <form onSubmit={handleSubmit} className="expenses-form">
          {isCreatingAnExpense && <h2>Add a new expense</h2>}
          {isEditingAnExpense && <h2>Edit {expense.name} expense</h2>}
          <div className="expenses-form-each-input">
            <label htmlFor="name">Name: </label>
            <input type="text" name="name" maxLength="18" onChange={handleNameChange} value={nameInput} autoComplete="off"/>
          </div>
          <div className="expenses-form-each-input">
            <label htmlFor="price">Price: </label>
            <input step=".01" max="10000000" type="number" name="price" onChange={handlePriceChange} value={priceInput} />
          </div>
          <div className="expenses-form-each-input">
            <label htmlFor="location">Location: </label>
            <input type="text" name="location" onChange={handleGeoLocationChange} value={locationInput}/>
          </div>
          
          
          <br />
          <div>
            {/* Show different buttons depending on if we are creating or editing: */}
            {isCreatingAnExpense && <button className="expenses-form-button" type="submit">+Add</button>}
            {isEditingAnExpense && <button className="expenses-form-button" type="submit">Update</button>}
            <button className="expenses-form-button expenses-form-button-back"><Link to={"/expenses"}>Back</Link></button>
            {errorMessage && <p style={{color: "red"}}>{errorMessage}</p>}
          </div>

        </form>
        <div>
          {/* In case we have some element on the searchLocationResults array, we will render them on the page. If we click one of them it will call a handler to select the coordinates of that specific location */}
            {searchLocationResults && 
            <div className="eachLocation-container">
              {searchLocationResults.map((eachLocation, index) => {
                // console.log(eachLocation)
                return (
                  <div key={index} className="eachLocation">
                    <p onClick={() => handleSelectedLocation(eachLocation)}>{eachLocation.display_name}</p>
                  </div>
                )
              })}
              </div>
            }
          </div>
          
      </div>
    </div>
  )
}

export default ExpensesForm