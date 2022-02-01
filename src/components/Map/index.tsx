import React, { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import MarkerIcon from "../Marker/Marker";
import "leaflet/dist/leaflet.css";
import { Geolocation } from "@capacitor/geolocation";
import { Map } from "leaflet";
import { IonModal, IonButton } from "@ionic/react";

import "./styles.css";
import YouMarkerIcon from "../Marker/YouMarker";

type latlang = {
  lat: number;
  lng: number;
};

export const MapComponent: React.FC = () => {
  const [userPosition, setUserPosition] = useState({} as latlang);
  const [agree, setAgree] = useState(false);

  const [markers, setMarkers] = useState<latlang[]>([]);
  const [newMarker, setNewMarker] = useState({} as latlang);

  const [map, setMap] = useState<Map>();

  const [showModal, setShowModal] = React.useState(false);

  const addMarker = (pos: latlang) => {
    setMarkers((oldMarkers) => [...oldMarkers, pos]);
    setShowModal(false);
  };

  function MyComponent() {
    useMapEvents({
      click: (e) => {
        setShowModal(true);
        setNewMarker({ lat: e.latlng.lat, lng: e.latlng.lng });
      },
    });
    return null;
  }

  const getUserPosition = async () => {
    try {
      let res = await Geolocation.getCurrentPosition();
      setUserPosition({ lat: res.coords.latitude, lng: res.coords.longitude });
      setAgree(true);
    } catch (err) {
      setUserPosition({
        lat: -15.795722362315178,
        lng: -47.88682937622071,
      });
    }
  };
  useEffect(() => {
    getUserPosition();
  }, []);

  useEffect(() => {
    if (map) {
      map.setView(userPosition);
    }
  }, [map, userPosition]);

  if (typeof userPosition.lat !== "number") return <h1>Solicitando Permissão...</h1>;
  return (
    <>
      <IonModal
        onAbort={() => setShowModal(false)}
        breakpoints={[0.5]}
        isOpen={showModal}
      >
        <h2 className="title">Novo marcador</h2>
        <IonButton onClick={() => addMarker(newMarker)}>
          Adicionar novo Marcador
        </IonButton>
        <IonButton onClick={() => setShowModal(false)}>Cancelar</IonButton>
      </IonModal>
      <MapContainer
        style={{ width: "100%", height: "100%" }}
        center={userPosition}
        zoom={17}
        scrollWheelZoom={false}
        whenCreated={(mapInstance) => setMap(mapInstance)}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MyComponent />
        {agree && (
          <Marker icon={YouMarkerIcon} position={userPosition}></Marker>
        )}
        {markers.map((marker, index) => (
          <Marker key={index} icon={MarkerIcon} position={marker}></Marker>
        ))}
      </MapContainer>
    </>
  );
};
