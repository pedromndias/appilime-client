//* This is a form component that will be reused (create new Expense and edit an Expense)

function ExpensesForm(props) {
    const {nameInput, priceInput, locationInput, handleSubmit, handleNameChange, handlePriceChange, handleGeoLocationChange, errorMessage, isEditingAnExpense, isCreatingAnExpense,searchLocationResults, handleSelectedLocation} = props
  return (
    <div>
        <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name: </label>
          <input type="text" name="name" onChange={handleNameChange} value={nameInput} autoComplete="off"/>
        </div>
        <div>
          <label htmlFor="price">Price: </label>
          <input type="number" name="price" onChange={handlePriceChange} value={priceInput} />
        </div>
        <div>
          <label htmlFor="location">Location: </label>
          <input type="text" name="location" onChange={handleGeoLocationChange} value={locationInput}/>
        </div>
        
        
        <br />
        {/* Show different buttons depending on if we are creating or editing: */}
        {isCreatingAnExpense && <button type="submit">+Add</button>}
        {isEditingAnExpense && <button type="submit">Update</button>}

        {errorMessage && <p style={{color: "red"}}>{errorMessage}</p>}

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
  )
}

export default ExpensesForm