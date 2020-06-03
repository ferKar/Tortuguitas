import React from "react";
import MapView from "react-native-maps";
import openMap from "react-native-open-maps";

export default function Map(props) {
  const { localización, nombre, direccion, height } = props;

  
  const openAppMap = () => {
    openMap({
      latitude: localización.latitude,
      longitude: localización.longitude,
      zoom: 18,
      query: nombre
    
    });
  };

  return (
    <MapView
      style={{ height: height, width: "100%" }}
      initialRegion={localización}
      onPress={openAppMap}
    >
      <MapView.Marker
        coordinate={{
          latitude: localización.latitude,
          longitude: localización.longitude
        }}
      />
    </MapView>
  );
}
