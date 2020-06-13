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
  const [totalNidos, setTotalNidos] = useState(0);

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

  useEffect(() => {
    db.collection("nidos")
      .get()
      .then((snap) => {
        setTotalNidos(snap.size);
      });

    (async () => {
      const resultNidos = [];
      const nombreCoor = [];
      const nidos = db.collection("nidos").orderBy("fecha", "desc");

      await nidos.get().then((response) => {
        response.forEach((doc) => {
          let coordena = doc.data().localización;
          let nido = doc.data();
          resultNidos.push({
            name: nido.nombre,
            tamaño: nido.tamaño,
            tipo: nido.tipo,
            latitude: nido.localización.latitude,
            longitude: nido.localización.longitude,
          });
        });
        setNidos(resultNidos);
      });
    })();
  }, []);

  //if (coordenas != null) console.log("Coordena", coordenas);
  //if (nidos != null) console.log("Nidos:", nidos);

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      region={{
        latitude: 19.36599103045581,
        longitude: -98.95577101036906,
        latitudeDelta: 0.09,
        longitudeDelta: 0.035,
      }}
    >
      {coordenas.map((marker) => (
        <Marker
          key={marker.name}
          title={marker.nombre}
          description={marker.tipo}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
        >
          <Image
            style={{ width: 40, height: 40 }}
            source={require("../../../assets/torMar.png")}
          />

          <MapView.Callout>
            <Text style={styles.bubbleTitle}>Tipo: {marker.tipo}</Text>

            <Text style={styles.bubbleTitle}>Nombre: {marker.name}</Text>
          </MapView.Callout>
        </Marker>
      ))}
      {nidos.map((marker) => (
        <Marker
          key={marker.nombre}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          title={marker.nombre}
          description={marker.tipo}
        >
          <Image
            style={{ width: 50, height: 50 }}
            source={require("../../../assets/nido.png")}
          />
          <Callout>
            <View>
              <Text style={styles.bubbleTitle}>Tipo: {marker.tipo}</Text>

              <Text style={styles.bubbleTitle}>Nombre: {marker.name}</Text>
            </View>
          </Callout>
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
