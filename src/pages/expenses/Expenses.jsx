
// Make use of react-leaflet to render maps:
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link, useNavigate } from "react-router-dom";
import { deleteAllExpensesService, getAllExpensesService } from "../../services/expenses.services";
import { BounceLoader } from "react-spinners"
import Sidebar from "../../components/navigation/Sidebar";

function Expenses() {
  let barcelonaCoords = [41.390106945633164, 2.1766662597656254]
  // Let's create state fot the map:
  const [ center, setCenter ] = useState(barcelonaCoords)
  
  const navigate = useNavigate()

  // Create state for the Expenses:
  const [expenses, setExpenses] = useState(null)
  // Create state for when the data is loading:
  const [isLoading, setIsLoading] = useState(true)
  // Create a state for the total price of the expenses:
  const [totalPrice, setTotalPrice] = useState(0)
  // Create state to show the deletion confirmation:
  const [showDeletionConfirmation, setShowDeletionConfirmation] = useState(false)
  // Create state for the map markers:
  const [allMarkers, setAllMarkers] = useState([])

  // Create an array for all the Markers:
  let allMarkersArray = []

  // Create a function to get all the data from the Expenses and change the states:
  const getData = async () => {
    try {
      // Use a service to get the data:
      const response = await getAllExpensesService()
      console.log(response.data);
      // Set the states
      // Set allMarkers as all the coordinates from each Expense:
      response.data.forEach(el => {
        if(el.geoLocation.length !== 0) {
          allMarkersArray.push(el.geoLocation)
        }
      })
      setAllMarkers(allMarkersArray)
      console.log(allMarkersArray);
      setExpenses(response.data)
      setIsLoading(false)
    } catch (error) {
      navigate("/error")
    }
  }

  // Create a function to set the total price as the sum of prices of each Expense:
  const calcTotalPrice = () => {
    if(expenses) {
      let totalPriceCalculated = 0
      expenses.forEach(el => {
        return totalPriceCalculated += el.price
      })
      // console.log(totalPriceCalculated.toFixed(2));
      setTotalPrice(totalPriceCalculated.toFixed(2))
    }
  }

  // useEffect to call getData:
  useEffect(() => {
    getData()
  }, [])

  // useEffect to call totalPrices:
  useEffect(() => {
    calcTotalPrice()
  })

  // Create a function that deletes all the expenses:
  const handleDeleteAllExpenses = async () => {
    setIsLoading(true)
    // Use a service to delete all Expenses:
    await deleteAllExpensesService()
    // Set the expenses to null again:
    setExpenses([])
    setIsLoading(false)
    setShowDeletionConfirmation(false)
  }

  // Create a check clause if we are still loading (and give time to the Backend to return the data):
  if (isLoading) {
    return (
      <div className="spinner-container">
        <BounceLoader color="blanchedalmond" size={100} />
      </div>
    )
  }

  return (
    <div className="container-with-sidebar">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="allExpenses">
        <div className="allExpenses-header">
          <h1>Expenses</h1>
          <div className="add-expense-link">
            <Link to={"/expenses/create"}>+Add</Link>
          </div>
        </div>
        <div className="allExpenses-container">
          {expenses.map(eachExpense => {
            return (
              <div className="add-expense-link-each">
                <Link key={eachExpense._id} to={`/expenses/${eachExpense._id}`} className="eachExpense-link">
                  <h3>{eachExpense.name}</h3>
                  <p>€{eachExpense.price}</p>
                </Link>
              </div>
            )
          })}
        </div>

        <MapContainer center={center} zoom={12} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* Show a Marker for each value on our allMarkers state array: */}
            {allMarkers.map((eachMarker, index) => {
              return eachMarker !== null && <Marker key={index} position={eachMarker} />
            })}

        </MapContainer>

        <div className="allExpenses-total">
          <h3>Total</h3>
          <p>€{totalPrice}</p>
        </div>
        {!showDeletionConfirmation && <button onClick={()=> setShowDeletionConfirmation(true)}>Delete All Expenses</button>}
        {showDeletionConfirmation && <div>
          <p>Are you sure you want to delete all Expenses?</p><button onClick={handleDeleteAllExpenses}>Yes</button><button onClick={() => setShowDeletionConfirmation(false)}>No</button>
        </div>}
      </div>
    </div>
  )
}

export default Expenses

