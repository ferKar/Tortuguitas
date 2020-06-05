import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
//import * as firebase from "firebase";




import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";

export default function CambioTamaño(props) {
  const { id, tamaño, setIsVisibleModal, setReloadData , toastRef} = props;
  const [newTamaño, setNewTamaño] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const db = firebase.firestore(firebaseApp);



   const updateTamaño = () => {
 
    setError(null);
    if (!newTamaño || newTamaño === tamaño) {
      setError("El tamaño no ha cambiado o esta vacio.");
    } else {
      setIsLoading(true);
      const update = newTamaño;
      db.collection("nidos")
      .doc(id).update("tamaño" , update)
      .then(() => {
          setIsLoading(false);
          setReloadData(true);
          //toastRef.current.show("tamaño actualizado correctamente");
          setIsVisibleModal(false);
        })
        .catch(() => {
          setError("Error al actualizar el tamaño.");
          setIsLoading(false);
        });
    }

  }; 

  return (
    <View style={styles.view}>
       <Input
        placeholder="Tamaño"
        containerStyle={styles.input}
        defaultValue={tamaño && tamaño}
        onChange={e => setNewTamaño(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: "arrow-split-vertical",
          color: "#c2c2c2"
        }}
        errorMessage={error} 
      />
      
      <Button
        title="Cambiar tamaño"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={updateTamaño}
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
