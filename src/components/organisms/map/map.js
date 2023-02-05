import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { useMapEvents } from 'react-leaflet/hooks'
import L from 'leaflet'
import "leaflet/dist/leaflet.css"
import './map.css'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import { useEffect, useState } from 'react'
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch'
import './../../../../node_modules/leaflet-geosearch/dist/geosearch.css'
import "leaflet-control-geocoder/dist/Control.Geocoder.css"
import "leaflet-control-geocoder/dist/Control.Geocoder.js"

const centralLatLng = {lat:-0.1892741496883334,lng: -78.4977070330735}

const searchControl = new GeoSearchControl({
  provider: new OpenStreetMapProvider(),
  style: 'bar',
});

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [10, 40], // point of the icon which will correspond to marker's location
});

L.Marker.prototype.options.icon = DefaultIcon;
export const Map = ({ search = false, onClick, positions }) => {
  useEffect(() => {
    console.log("map");
    console.log(positions)
  }, [positions])

  return (
    <MapContainer className='map' center={positions ? positions[0] : centralLatLng} zoom={13} scrollWheelZoom={true} >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <AddSearch /> */}
      <LeafletControlGeocoder />

      {

        search ?
          <LocationMarker onClick={(value) => onClick(value)} /> :
          <>
            <CenterPosition position={positions ? positions[0] : centralLatLng} />
            {
              positions &&
              positions[0] &&
              positions.map((position) => {
                return (
                  <Marker position={position} >
                    <Popup>
                      Medidor IOT
                    </Popup>
                  </Marker>
                )
              })
            }

          </>
      }
    </MapContainer>
  );
}
const LeafletControlGeocoder = () => {
  const map = useMap();

  useEffect(() => {
    var geocoder = L.Control.Geocoder.nominatim();


    L.Control.geocoder({
      query: "",
      placeholder: "Search here...",
      defaultMarkGeocode: false,
      geocoder
    })
      .on("markgeocode", function (e) {
        var latlng = e.geocode.center;
        L.marker(latlng)
          .addTo(map)
          .bindPopup(e.geocode.name)
          .openPopup();
        map.fitBounds(e.geocode.bbox);
      })
      .addTo(map);
  }, []);

  return null;
}

export const AddSearch = () => {
  const map = useMap();
  useEffect(() => {
    map.addControl(searchControl);
  },
    [])
  return null;
}

export const CenterPosition = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(position)
  }, [position])

  return null
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