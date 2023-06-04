//* This is a form component that will be reused (create new Expense and edit an Expense)

function ExpensesForm(props) {
    const {nameInput, priceInput, geoLocationInput, handleSubmit, handleNameChange, handlePriceChange, handleGeoLocationChange, errorMessage, isEditingAnExpense, isCreatingAnExpense, selectedLocation, setSelectedLocation,searchLocationResults, handleSelectedLocation} = props
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
          <input type="text" name="location" onChange={handleGeoLocationChange} value={geoLocationInput}/>
        </div>
        
        
        <br />
        {/* Show different buttons depending on if we are creating or editing: */}
        {isCreatingAnExpense && <button type="submit">+Add</button>}
        {isEditingAnExpense && <button type="submit">Update</button>}

        {errorMessage && <p style={{color: "red"}}>{errorMessage}</p>}

      </form>
      <div>
          {searchLocationResults && 
          <div className="eachLocation-container">
            {searchLocationResults.map((eachLocation, index) => {
              console.log(eachLocation)
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