import React, { useState } from "react";
import { StyleSheet, View, Picker, Text } from "react-native";
import { Input, Button } from "react-native-elements";




import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";

export default function CambioTipo(props) {
  const { id, tipo, setIsVisibleModal, setReloadData , toastRef} = props;
  const [newTipo, setNewTipo] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const db = firebase.firestore(firebaseApp);


   const updateTipo = () => {
 
    setError(null);
    //if (!newTipo || newTipo === tipo) {
      //setError("El tipo no ha cambiado o esta vacio.");
    //} else {
      setIsLoading(true);
      const update = newTipo;
      db.collection("nidos")
      .doc(id).update("tipo" , update)
      .then(() => {
          setIsLoading(false);
          setReloadData(true);
          //toastRef.current.show("tipo actualizado correctamente");
          setIsVisibleModal(false);
        })
        .catch(() => {
          setError("Error al actualizar el tipo.");
          setIsLoading(false);
        });
    //}

  }; 

  return (
    <View style={styles.view}>
        <View style={{ height: 50, width: "100%"}}  >
        <PickerTipo
            setNewTipo={setNewTipo}
            
        />
        
        </View>
       
      <Button
        title="Cambiar tipo"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={updateTipo}
        loading={isLoading}
      /> 
    </View>
  );
}

function PickerTipo(props){
    const {setNewTipo} = props;
    const [selectedValue, setSelectedValue] = useState("");
    return(
     <View>
          <Picker
            selectedValue={selectedValue}
            style={{ height: 50, width: "100%" }}
            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue) & setNewTipo(itemValue)}
     
          >
            <Picker.Item label="Elige el tipo de Nido" value="" />
            <Picker.Item label="Nido de tortuga Marina" value="Marina" />
            <Picker.Item label="Nido de tortuga Terrestre" value="Terrestre" />
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
