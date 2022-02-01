import L from "leaflet";

const YouMarkerIcon = new L.Icon({
  iconUrl: require("./youMarker.png"),
  iconRetinaUrl: require("./youMarker.png"),
  iconAnchor: null,
  popupAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(60, 60),
});

export default YouMarkerIcon;
