import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { Icon } from "react-native-elements";


import firebase from "firebase/app";

export default function AgregaTN(props) {
  const { navigation } = props;
  const [userLogged, setUserLogged] = useState(false);

  const [user, setUser] = useState(null);
 
 

    useEffect(() => {
    firebase.auth().onAuthStateChanged(userInfo => {
      setUser(userInfo);
    });
  }, []); 

  firebase.auth().onAuthStateChanged(user => {
    user ? setUserLogged(true) : setUserLogged(false);
  });

  

if (!userLogged) {
  return (
    <UserNoLogged
      navigation={navigation}
    />
  );
} 

  return (
    <View style={styles.viewBody}>
      
      {user &&( 
         <View style={styles.contenedorBotones}>
          <View style={styles.botonTortugas}>
            <AddTortugaButton
            navigation={navigation}
            />
          </View>
          <View style={styles.botonNido}>
            <AddNidoButton 
            navigation={navigation}
             />
          </View>
      </View>
       )} 
     
    </View>
  );
}

 function AddTortugaButton(props) {
  const { navigation } = props;

   return (

          <Button
            title="Anadir Tortuga"
            color= "#00a680"
            onPress={() =>
              navigation.navigate("AddTortuga")
            }
          />
       );
} 

function AddNidoButton(props) {
  const { navigation } = props;

   return (

          <Button
            title="Anadir Nido"
            color= "#00a680"
            onPress={() =>
              navigation.navigate("AddNido")
            }
          />
       );
} 

function UserNoLogged(props) {
  const { navigation } = props;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View>
         <Icon type="material-community" name="alert-outline" size={50} />
          <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
             Necesitas estar logeado para ver esta sección.
          </Text>
      </View>
       <View style={styles.viewButton} >
        <Button
        buttonStyle={{width:"100%"}}

           title={"Ir al login "}
          onPress={() => navigation.navigate("Login")}
          color ="#00a680"
        />
      </View>
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
