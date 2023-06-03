
// Make use of react-leaflet to render maps:
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link, useNavigate } from "react-router-dom";
import { getAllExpensesService } from "../../services/expenses.services";

function Expenses() {
  // todo render map with all the expenses
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

  // Create a function to get all the data from the Expenses and change the states:
  const getData = async () => {
    try {
      // Use a service to get the data:
      const response = await getAllExpensesService()
      // console.log(response);
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


  // Create a check clause if we are still loading (and give time to the Backend to return the data):
  if (isLoading) {
    return <h3>...Loading</h3>
  }

  return (
    <div>
      <h1>Expenses</h1>
      <Link to={"/expenses/create"}>+Add</Link>
      {expenses.map(eachExpense => {
        return (
          <Link key={eachExpense._id} to={`/expenses/${eachExpense._id}`}>
            <h3>{eachExpense.name}</h3>
            <p>€{eachExpense.price}</p>
          </Link>
        )
      })}
      <div>
        <h3>Total</h3>
        <p>€{totalPrice}</p>
      </div>

      <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* invoke Marker Componentes here */}
          

      </MapContainer>
    </div>
  )
}

export default Expenses

