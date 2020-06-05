import React, { useState } from "react";
import { StyleSheet, View, Picker, Text } from "react-native";
import { Input, Button } from "react-native-elements";




import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";

export default function Cambiogenero(props) {
  const { id, genero, setIsVisibleModal, setReloadData , toastRef} = props;
  const [newGenero, setNewGenero] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const db = firebase.firestore(firebaseApp);


   const updateGenero = () => {
 
    setError(null);
    //if (!newGenero || newGenero === genero) {
     // setError("El genero no ha cambiado o esta vacio.");
    //} else {
      setIsLoading(true);
      const update = newGenero;
      db.collection("tortugas")
      .doc(id).update("genero" , update)
      .then(() => {
          setIsLoading(false);
          setReloadData(true);
          //toastRef.current.show("genero actualizado correctamente");
          setIsVisibleModal(false);
        })
        .catch(() => {
          setError("Error al actualizar el genero.");
          setIsLoading(false);
        });
    //}

  }; 

  return (
    <View style={styles.view}>
        <View style={{ height: 50, width: "100%"}}>
        <PickerGenero
            setNewGenero={setNewGenero}
        />
        </View>
       
      <Button
        title="Cambiar genero"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={updateGenero}
        loading={isLoading}
      /> 
    </View>
  );
}


function PickerGenero(props){
    const {setNewGenero} = props;
    const [selectedValue, setSelectedValue] = useState("");
  
      return(
     <View>
         <Picker
          selectedValue={selectedValue}
          style={{ height: 50, width: "100%" }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue) & setNewGenero(itemValue)}
        >
          <Picker.Item label="Elige el genero" value=""/>
          <Picker.Item label="Desconocido" value="Desconocido"/>
          <Picker.Item label="Hembra" value="Hembra" />
          <Picker.Item label="Macho" value ="Macho" />
        </Picker>
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
  },

  viewForm: {
    marginLeft: 10,
    marginRight: 10
  },
});
