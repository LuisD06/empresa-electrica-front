import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Icon } from "leaflet";
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import './map.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;
export const Map = () => {
  const position = [-0.2542279958, -78.5103988647];
  return (
    <MapContainer className='map' center={position} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} >
        <Popup>
          Medidor IOT
        </Popup>
      </Marker>
    </MapContainer>
  );
}