


import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import ListTortugas from "../../components/Tortugas/ListTortugas";

import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function Tortuga(props) {

  const { navigation} = props;
  const [user, setUser] = useState(null);
  const [tortugas, setTortugas] = useState([]);
  const [startTortugas, setStartTortugas] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalTortugas, setTotalTortugas] = useState(0);
  const [isReloadTortugas, setIsReloadTortugas] = useState(false);
  const limitTortugas = 12; 
 


   useEffect(() => {
    firebase.auth().onAuthStateChanged(userInfo => {
      setUser(userInfo);
    });
  }, []); 

   useEffect(() => {
    db.collection("tortugas")
      .get()
      .then(snap => {
        setTotalTortugas(snap.size);
      });
    

    (async () => {
      const resultTortugas = [];

      const tortugas = db
        .collection("tortugas")
        .orderBy("fecha", "desc")
        .limit(limitTortugas);

      await tortugas.get().then(response => {
        setStartTortugas(response.docs[response.docs.length - 1]);

        response.forEach(doc => {
          let tortuga = doc.data();
          tortuga.id = doc.id;
          resultTortugas.push({ tortuga });
        });
        setTortugas(resultTortugas);
      });
    })();
    setIsReloadTortugas(false);
  }, [isReloadTortugas]);


 
   const handleLoadMore = async () => {
    const resultTortugas = [];
    tortugas.length < totalTortugas && setIsLoading(true);

    const tortugasDb = db
      .collection("tortugas")
      .orderBy("fecha", "desc")
      .startAfter(startTortugas.data().createAt)
      .limit(limitTortugas);

    await tortugasDb.get().then(response => {
      if (response.docs.length > 0) {
        setStartTortugas(response.docs[response.docs.length - 1]);
      } else {
        setIsLoading(false);
      }

      response.forEach(doc => {
        let tortuga = doc.data();
        tortuga.id = doc.id;
        resultTortugas.push({ tortuga });
      });

      setTortugas([...tortugas, ...resultTortugas]);
    });
  };
 
  return (
    <View style={styles.viewBody}>
      
      {user &&(
         <View style={styles.contenedorBotones}>
          <ListTortugas
        tortugas={tortugas}
        isLoading={isLoading}
        handleLoadMore={handleLoadMore}
       // setIsReloadTortugas={}//PCNP
        navigation={navigation}
       />
      </View>
      )}
     
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
   
  },

  contenedorBotones : {
    flex: 1,
    alignItems:'center',
    justifyContent:'center'
  },

  botonTortugas:{
      
      marginBottom: 20,
      marginLeft: 10,
      marginRight:10,
      width: "90%",
      height: 40
     
  },

  botonNido:{
    marginBottom: 20,
    marginLeft: 10,
    marginRight:10,
    width: "90%",
    height: 40


  }

});



