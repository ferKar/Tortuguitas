import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
//import * as firebase from "firebase";




import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";

export default function CambioDireccion(props) {
  const { id, direccion, setIsVisibleModal, setReloadData , toastRef} = props;
  const [newDirección, setNewDirección] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const db = firebase.firestore(firebaseApp);

   const updateDireccion = () => {
 
    setError(null);
    if (!newDirección || newDirección === direccion) {
      setError("El dirección no ha cambiado o esta vacio.");
    } else {
      setIsLoading(true);
      const update = newDirección;
      db.collection("nidos")
      .doc(id).update("direccion" , update)
      .then(() => {
          setIsLoading(false);
          setReloadData(true);
          //toastRef.current.show("dirección actualizado correctamente");
          setIsVisibleModal(false);
        })
        .catch(() => {
          setError("Error al actualizar el dirección.");
          setIsLoading(false);
        });
    }

  }; 

  return (
    <View style={styles.view}>
       <Input
        placeholder="Dirección"
        containerStyle={styles.input}
        defaultValue={direccion && direccion}
        onChange={e => setNewDirección(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: "map-marker",
          color: "#c2c2c2"
        }}
        errorMessage={error} 
      />
      
      <Button
        title="Cambiar Dirección"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={updateDireccion}
        loading={isLoading}
      /> 
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10
  },
  input: {
    marginBottom: 10
  },
  btnContainer: {
    marginTop: 20,
    width: "95%"
  },
  btn: {
    backgroundColor: "#00a680"
  }
});
