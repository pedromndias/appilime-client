
import { useState } from "react";
// Make use of react-leaflet to render maps:
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import ClickMarker from "./ClickMarker";


function ExpensesDetails() {
  // Let's create state fot the map:
  const [ center, setCenter ] = useState([51.505, -0.09])
  // Let's create state for the clicked position:
  const [clickedPosition, setClickedPosition] = useState(null);
  let barcelonaCoords = [41.390106945633164, 2.1766662597656254]
  
  return (
    <div>
      <h2>Expenses Details</h2>
      <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Invoke the ClickMarket component */}
        <ClickMarker setClickedPosition={setClickedPosition} />
        { clickedPosition !== null && <Marker position={clickedPosition} /> }

      </MapContainer>;
    </div>
  )
}

export default ExpensesDetails