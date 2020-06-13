import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, Alert } from "react-native";
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Callout,
  Polygon,
  Circle,
} from "react-native-maps";
import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function ScreenNidosAdmin(props) {
  const [totalTortugas, setTotalTortugas] = useState(0);

  const [tortugas, setTortugas] = useState([]);
  const [coordenas, setCoordenas] = useState([]);
  const [nidos, setNidos] = useState([]);
  const [coordenasN, setCoordenasN] = useState([]);

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
          nombreCoor.push({
            name: tortuga.nombre,
            tipo: tortuga.tipo,
            tamaño: tortuga.tamaño,
            latitude: coordena.latitude,
            longitude: coordena.longitude,
          });
          resultTortugas.push({ tortuga });
        });
        setTortugas(resultTortugas);
        setCoordenas(nombreCoor);
      });
    })();
  }, []);

  if (coordenas != null) console.log("Coordena", coordenas);

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      region={{
        latitude: 19.3895472,
        longitude: -99.095331,
        latitudeDelta: 0.09,
        longitudeDelta: 0.035,
      }}
    >
      {coordenas.map((marker) => (
        <Marker
          key={marker.name}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
        >
          <Image
            style={{ width: 20, height: 20 }}
            source={require("../../../assets/torMar.png")}
          />
        </Marker>
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    height: "100%",
  },
});
