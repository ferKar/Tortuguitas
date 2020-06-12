import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import ActionButton from "react-native-action-button";
import ListNidos from "../../components/Nido/ListNidos";

import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function nidos(props) {
  const { navigation } = props;
  const [user, setUser] = useState(null);
  const [nidos, setNidos] = useState([]);
  const [startNidos, setStartNidos] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalNidos, setTotalNidos] = useState(0);
  const [isReloadNidos, setIsReloadNidos] = useState(false);
  const limitNidos = 12;

  useEffect(() => {
    firebase.auth().onAuthStateChanged(userInfo => {
      setUser(userInfo);
    });
  }, []);

  useEffect(() => {
    db.collection("nidos")
      .get()
      .then(snap => {
        setTotalNidos(snap.size);
      });

    (async () => {
      const resultNidos = [];

      const nidos = db
        .collection("nidos")
        .orderBy("fecha", "desc")
        .limit(limitNidos);

      await nidos.get().then(response => {
        setStartNidos(response.docs[response.docs.length - 1]);

        response.forEach(doc => {
          let nido = doc.data();
          nido.id = doc.id;
          resultNidos.push({ nido });
        });
        setNidos(resultNidos);
      });
    })();
    //setIsReloadNidos(false);
  }, []);//[isReloadNidos]);

  const handleLoadMore = async () => {
    const resultNidos = [];
    nidos.length < totalNidos && setIsLoading(true);

    const nidosDb = db
      .collection("nidos")
      .orderBy("fecha", "desc")
      .startAfter(startNidos.data().fecha)
      .limit(limitNidos);

    await nidosDb.get().then(response => {
      if (response.docs.length > 0) {
        setStartNidos(response.docs[response.docs.length - 1]);
      } else {
        setIsLoading(false);
      }

      response.forEach(doc => {
        let nido = doc.data();
        nido.id = doc.id;
        resultNidos.push({ nido });
      });

      setNidos([...nidos, ...resultNidos]);
    });
  };

  return (
    <View style={styles.viewBody}>
      <ListNidos
        nidos={nidos}
        isLoading={isLoading}
        handleLoadMore={handleLoadMore}
        navigation={navigation}
      />
    
    </View>
  );
}



const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  }
});
