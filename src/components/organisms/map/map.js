import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { useMapEvents } from 'react-leaflet/hooks'
import L from 'leaflet'
import "leaflet/dist/leaflet.css"
import './map.css'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import { useState } from 'react'

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [10, 40], // point of the icon which will correspond to marker's location
});

L.Marker.prototype.options.icon = DefaultIcon;
export const Map = ({ search = false, onClick, position=[-0.2542279958, -78.5103988647] }) => {
  return (
    <MapContainer className='map' center={position} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {
        search ?
          <LocationMarker onClick={(value) => onClick(value)} /> :
          <Marker position={position} >
            <Popup>
              Medidor IOT
            </Popup>
          </Marker>
      }
    </MapContainer>
  );
}
export const LocationMarker = ({ onClick }) => {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click(e) {
      console.log(e);
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom())
      onClick(e.latlng);
    },
    locationfound(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  )
}