import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import ActionButton from "react-native-action-button";
//import ListRestaurants from "../../components/Restaurants/ListRestaurants";

import { firebaseApp } from "../utils/FireBase";
import firebase from "firebase/app";
//import "firebase/firestore";
//const db = firebase.firestore(firebaseApp);

export default function AgregaTN(props) {
  const { navigation } = props;
  const [user, setUser] = useState(null);
 // const [restaurants, setRestaurants] = useState([]);
  //const [startRestaurants, setStartRestaurants] = useState(null);
 // const [isLoading, setIsLoading] = useState(false);
 // const [totalRestaurants, setTotalRestaurants] = useState(0);
  const [isReloadTortugas, setIsReloadTortugas] = useState(false);
 // const limitRestaurants = 12; 
 

   useEffect(() => {
    firebase.auth().onAuthStateChanged(userInfo => {
      setUser(userInfo);
    });
  }, []); 

  /* useEffect(() => {
    db.collection("restaurants")
      .get()
      .then(snap => {
        setTotalRestaurants(snap.size);
      });

    (async () => {
      const resultRestaurants = [];

      const restaurants = db
        .collection("restaurants")
        .orderBy("createAt", "desc")
        .limit(limitRestaurants);

      await restaurants.get().then(response => {
        setStartRestaurants(response.docs[response.docs.length - 1]);

        response.forEach(doc => {
          let restaurant = doc.data();
          restaurant.id = doc.id;
          resultRestaurants.push({ restaurant });
        });
        setRestaurants(resultRestaurants);
      });
    })();
    setIsReloadTortugas(false);
  }, [isReloadTortugas]);
 */
  /* const handleLoadMore = async () => {
    const resultRestaurants = [];
    restaurants.length < totalRestaurants && setIsLoading(true);

    const restaurantsDb = db
      .collection("restaurants")
      .orderBy("createAt", "desc")
      .startAfter(startRestaurants.data().createAt)
      .limit(limitRestaurants);

    await restaurantsDb.get().then(response => {
      if (response.docs.length > 0) {
        setStartRestaurants(response.docs[response.docs.length - 1]);
      } else {
        setIsLoading(false);
      }

      response.forEach(doc => {
        let restaurant = doc.data();
        restaurant.id = doc.id;
        resultRestaurants.push({ restaurant });
      });

      setRestaurants([...restaurants, ...resultRestaurants]);
    });
  };
 */
  return (
    <View style={styles.viewBody}>
      
      {user &&(
         <View style={styles.contenedorBotones}>
          <View style={styles.botonTortugas}>
            <AddTortugaButton
            navigation={navigation}
            //setIsReloadTortugas={setIsReloadTortugas}
            />
          </View>
          <View style={styles.botonNido}>
            <AddNidoButton 
            navigation={navigation}
           // setIsReloadTortugas={setIsReloadTortugas}
             />
          </View>
      </View>
      )}
     
    </View>
  );
}

 function AddTortugaButton(props) {
  const { navigation, setIsReloadTortugas } = props;

   return (

          <Button
            title="Anadir Tortuga"
            color= "#00a680"
            onPress={() =>
              navigation.navigate("AddTortuga")
              //navigation.navigate("AddTortuga", { setIsReloadRestaurants })
            }
          />
       );
} 

function AddNidoButton(props) {
  const { navigation, setIsReloadTortugas } = props;

   return (

          <Button
            title="Anadir Nido"
            color= "#00a680"
            onPress={() =>
              navigation.navigate("AddNido")
              //navigation.navigate("AddNido", { setIsReloadRestaurants })
            }
          />
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
