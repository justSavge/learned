/* eslint-disable no-unused-vars */
import { useNavigate, useSearchParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import { useLJEZContext } from "../context/AppContext";
import styles from "./Map.module.css";
function Map() {
  const { cities } = useLJEZContext();
  const [mapPostion, setMapPostion] = useState([51.505, -0.09]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  useEffect(
    function () {
      if (lat && lng) setMapPostion([lat, lng]);
    },
    [lat, lng]
  );
  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      {/* navigate("form")转到form */}
      <MapContainer
        // center={mapPostion}
        center={[lat || 40, lng || 0]}
        zoom={6}
        scrollWheelZoom={false}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => {
          return (
            <Marker
              position={[city.position.lat, city.position.lng]}
              key={city.id}
            >
              <Popup>
                <span>{city.emoji}</span>
                <span>{city.cityName}</span>
              </Popup>
            </Marker>
          );
        })}
        <ChangeCenter position={mapPostion} />
      </MapContainer>
    </div>
  );
}
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

export default Map;
