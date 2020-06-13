import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Marker } from "react-native-maps";
import MapView, { Heatmap, PROVIDER_GOOGLE } from "react-native-maps";

import { firebaseApp } from "../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

const initialRegion = {
  latitude: 20.618065,
  longitude: -105.177453,
  latitudeDelta: 0.25,
  longitudeDelta: 0.15,
};
function removeEmptyObjects(obj) {
  return Object.keys(obj).forEach((key) =>
    obj[key] === undefined ? delete obj[key] : {}
  );
}

function renderRandomMarkers(n) {
  const { latitude, longitude, latitudeDelta, longitudeDelta } = initialRegion;
  return new Array(n).fill().map((x, i) => (
    <Marker
      key={i}
      coordinate={{
        latitude: latitude + (Math.random() - 0.5) * latitudeDelta,
        longitude: longitude + (Math.random() - 0.5) * longitudeDelta,
      }}
    />
  ));
}

export default function MapaCS() {
  const [totalTortugas, setTotalTortugas] = useState(0);

  const [tortugas, setTortugas] = useState([]);
  const [coordenas, setCoordenas] = useState([]);

  console.log("Prueba ");

  useEffect(() => {
    db.collection("tortugas")
      .get()
      .then((snap) => {
        setTotalTortugas(snap.size);
      });

    (async () => {
      const resultTortugas = [];
      const nombreCoor = [];
      const tortugas = db.collection("tortugas").orderBy("fecha", "desc");

      await tortugas.get().then((response) => {
        response.forEach((doc) => {
          let coordena = doc.data().localización;
          let tortuga = doc.data();
          tortuga.id = doc.id;
          tortuga.localización.latitude = doc.data().localización.latitude;
          tortuga.localización.longitude = doc.data().localización.longitude;

          tortugas.localización = doc.localización;
          nombreCoor.push({ coordena });
          resultTortugas.push({ tortuga });
        });
        setTortugas(resultTortugas);
        setCoordenas(nombreCoor);
      });
    })();
  }, []);

  coordenas.forEach((element) => console.log("Elemento: " + element.item));

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={(map) => (this._map = map)}
        style={styles.map}
        initialRegion={initialRegion}
      >
        {renderRandomMarkers(10)}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
