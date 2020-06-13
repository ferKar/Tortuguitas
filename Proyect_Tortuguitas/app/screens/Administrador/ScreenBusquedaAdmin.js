import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { Icon } from "react-native-elements";


import firebase from "firebase/app";

export default function ScreenBusquedaAdmin(props) {
  const { navigation } = props;
  return (
    <View style={styles.viewBody}>
      
     
         <View style={styles.contenedorBotones}>
          <View style={styles.botonTortugas}>
            <BusquedaTortugaButton
            navigation={navigation}
            />
          </View>
          <View style={styles.botonNido}>
            <BusquedaNidoButton 
            navigation={navigation}
             />
          </View>
      </View>
       
     
    </View>
  );
}

 function BusquedaTortugaButton(props) {
  const { navigation } = props;

   return (

          <Button
            title="Buscar Tortuga"
            color= "#00a680"
            onPress={() =>
              navigation.navigate("BusquedaT")
            }
          />
       );
} 

function BusquedaNidoButton(props) {
  const { navigation } = props;

   return (

          <Button
            title="Buscar Nido"
            color= "#00a680"
            onPress={() =>
              navigation.navigate("BusquedaN")
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

  viewButton:{
    marginTop: 40,
    marginBottom: 20,
    marginLeft: 10,
    marginRight:10,
    width: "80%",
    height: 45
  },

  botonNido:{
    marginBottom: 20,
    marginLeft: 10,
    marginRight:10,
    width: "90%",
    height: 40


  }

});
