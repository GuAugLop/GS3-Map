import L from "leaflet";

const MarkerIcon = new L.Icon({
  iconUrl: require("./marker.png"),
  iconRetinaUrl: require("./marker.png"),
  iconAnchor: null,
  popupAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(60, 60),
});

export default MarkerIcon;
