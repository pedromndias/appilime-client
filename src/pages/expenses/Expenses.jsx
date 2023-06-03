
// Make use of react-leaflet to render maps:
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function Expenses() {
  // todo render map with all the expenses

  let barcelonaCoords = [41.390106945633164, 2.1766662597656254]
  // Let's create state fot the map:
  const [ center, setCenter ] = useState(barcelonaCoords)
  
  return (
    <div>
      <h2>Expenses</h2>
      <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* invoke Marker Componentes here */}
          

      </MapContainer>;
    </div>
  )
}

export default Expenses

