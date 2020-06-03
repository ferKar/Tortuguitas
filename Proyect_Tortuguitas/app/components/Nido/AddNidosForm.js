import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Alert, Dimensions,Picker ,Text } from "react-native";
import { Icon, Avatar, Image, Input, Button } from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import Modal from "../Modal";
import uuid from "uuid/v4";

import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);
 
const WidthScreen = Dimensions.get("window").width;

export default function AddNidoForm(props) {
  const { toastRef, setIsLoading, navigation,  /* setIsReloadRestaurants  */ } = props;
  const [imagesSelected, setImagesSelected] = useState([]);
  const [nidoName, setNidoName] = useState("");
  const [nidoAddress, setNidoAddress] = useState("");
  const [nidoDescription, setNidoDescription] = useState("");

  const [nidoTamaño, setNidoTamaño] = useState("");
  const [nidoTipo, setNidoTipo] = useState("");
  const [isVisibleMap, setIsVisibleMap] = useState(false);
  const [locationNido, setLocationNido] = useState(null);
 



   const AddNido = () => {


    if (!nidoName || !nidoAddress || !nidoDescription || !nidoTipo || !nidoTamaño) {
      toastRef.current.show("Todos los campos del formulario son obligatorios");
    } else if (imagesSelected.length === 0) {
      toastRef.current.show("El Nido tiene que tener almenos una foto");
    } else if (!locationNido) {
      toastRef.current.show("Tienes que localizar el Nido en el mapa");
    } else {
      
      setIsLoading(true);
      uploadImagesStorage(imagesSelected).then(arrayImages => {
        db.collection("nidos")
          .add({
            nombre: nidoName,
            tipo: nidoTipo,
            tamaño: nidoTamaño,
            direccion: nidoAddress,
            localización: locationNido,
            descripcion: nidoDescription,
            images: arrayImages,
            fecha: new Date(),
            usuario: firebaseApp.auth().currentUser.uid

          })
          .then(() => {
            setIsLoading(false);
            //setIsReloadRestaurants(true);
            navigation.navigate("Nidos");
          })
          .catch(error => {
            setIsLoading(false);
            toastRef.current.show(
              "Error al subir el Nido, intento más tarde"
            );
          });
      }); 
     

    }  
 
  }; 

  const uploadImagesStorage = async imageArray => {
    const imagesBlob = [];
    await Promise.all(
      imageArray.map(async image => {
        const response = await fetch(image);
        const blob = await response.blob();
        const ref = firebase
          .storage()
          .ref("nidos")
          .child(uuid());
        await ref.put(blob).then(result => {
          imagesBlob.push(result.metadata.name);
   
        });
      })
    );
    return imagesBlob;
  }; 

  return (
    <ScrollView>
      <ImageNido imageNido={imagesSelected[0]} />
      <FormAdd
        setNidoName={setNidoName}
        setNidoAddress={setNidoAddress}
        setNidoDescription={setNidoDescription}
     
        setNidoTamaño={setNidoTamaño}
        setNidoTipo={setNidoTipo}
        setIsVisibleMap={setIsVisibleMap}
        locationNido={locationNido}
      />
       <UploadImagen
        imagesSelected={imagesSelected} 
        setImagesSelected={setImagesSelected}
        toastRef={toastRef}  
      /> 
       <Button
        title="Añadir Nido"
        onPress={AddNido}
        buttonStyle={styles.btnAddNido}
      />

      <Map
        isVisibleMap={isVisibleMap}
        setIsVisibleMap={setIsVisibleMap}
        setLocationNido={setLocationNido}
        toastRef={toastRef} 
      />
    </ScrollView>
  );
}
 
function ImageNido(props) {
  const { imageNido } = props;

  return (
    <View style={styles.viewPhoto}>
      {imageNido ? (
        <Image
          source={{ uri: imageNido }}
          style={{ width: WidthScreen, height: 200 }}
        />
      ) : (
        <Image
          source={require("../../../assets/img/no-image.png")}
          style={{ width: WidthScreen, height: 200 }}
        />
      )}
    </View>
  );
} 

 function UploadImagen(props) {
  const { imagesSelected, setImagesSelected, toastRef } = props;

  const imageSelect = async () => {
    const resultPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    const resultPermissionCamera =
      resultPermission.permissions.cameraRoll.status;

    if (resultPermissionCamera === "denied") {
      toastRef.current.show(
        "Es necesario aceptar los permisos de la galeria, si los has rechazado tienes que ir ha ajustes y activarlos manualmente.",
        3000
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });

      if (result.cancelled) {
        toastRef.current.show(
          "Has cerrado la galeria sin seleccionar ninguna imagen",
          2000
        );
      } else {
        setImagesSelected([...imagesSelected, result.uri]);
      }
    }
  }; 

   const removeImage = image => {
    const arrayImages = imagesSelected;

    Alert.alert(
      "Elimnar Imagen",
      "¿Estas seguro de que quieres eliminar la imagen?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Eliminar",
          onPress: () =>
            setImagesSelected(
              arrayImages.filter(imageUrl => imageUrl !== image)
            )
        }
      ],
      { cancelable: false }
    );
  }; 

  return (
    <View style={styles.viewImages}>
      {imagesSelected.length < 4 && (
        <Icon
          type="material-community"
          name="camera"
          color="#7a7a7a"
          containerStyle={styles.containerIcon}
          onPress={imageSelect}
        />
      )}

       {imagesSelected.map(imageNido => (
        <Avatar
          key={imageNido}
          onPress={() => removeImage(imageNido)} 
          style={styles.miniatureStyle}
          source={{ uri: imageNido }}
        />
      ))} 
    </View>
  );
}
 
function FormAdd(props) {
   const {
    setNidoName,
    setNidoAddress,
    setNidoDescription,
    setNidoTipo,
    
    setNidoTamaño,
    setIsVisibleMap,
    locationNido
  } = props; 

  return (
    <View style={styles.viewForm}>
      <Input
        placeholder="Nombre de la especie"
        containerStyle={styles.input}
        onChange={e => setNidoName(e.nativeEvent.text)}
      />
  
      
      <View style={styles.container}>
      
    </View>
      
      <View>
         <PickerTipo 
          setNidoTipo={setNidoTipo}
         /> 
      </View>


      <Input 
        placeholder = "Tamaño"
        containerStyle = {styles.input}
        onChange = {e => setNidoTamaño(e.nativeEvent.text)}
      />

      <Input
        placeholder="Localización"
        containerStyle={styles.input}
         rightIcon={{
          type: "material-community",
          name: "google-maps",
          color: locationNido ? "#00a680" : "#c2c2c2",
          onPress: () => setIsVisibleMap(true)
        }}
        onChange={e => setNidoAddress(e.nativeEvent.text)} 
      /> 
      <Input
        placeholder="Descripción del Nido"
        multiline={true}
        
        inputContainerStyle={styles.textArea}
        onChange={e => setNidoDescription(e.nativeEvent.text)}
      />
    
    </View>

  ); 
}

function PickerTipo(props){
  const {setNidoTipo} = props;
  const [selectedValue, setSelectedValue] = useState("");
  return(
   <View>
        <Picker
          selectedValue={selectedValue}
          style={{ height: 50, width: "100%" }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue) & setNidoTipo(itemValue)}
   
        >
          <Picker.Item label="Tipo de nido" value="" />
          <Picker.Item label="De tortuga Marina" value="Marina" />
          <Picker.Item label="De tortuga Terrestre" value="Terrestre" />
        </Picker>
      </View>
  );

} 

 
function Map(props) {
  const {
    isVisibleMap,
    setIsVisibleMap,
    setLocationNido, 
    toastRef
  } = props;
  const [location, setLocation] = useState(null);
 
   useEffect(() => {
    (async () => {
      const resultPermissions = await Permissions.askAsync(
        Permissions.LOCATION
      );
      const statusPermissions = resultPermissions.permissions.location.status;

      if (statusPermissions !== "granted") {
        toastRef.current.show(
          "Tienes que aceptar los permisos de localización para añadir una Nido.",
          3000
        );
      } else {
        const loc = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001
        });
      }
    })();
  }, []); 
 
   const confirmLocation = () => {
    setLocationNido(location);
    toastRef.current.show("Localización guardada correctamente");
    setIsVisibleMap(false);
  }; 

  return (
    <Modal isVisible={isVisibleMap} setIsVisible={setIsVisibleMap}>
      <View>
        {location && (
          <MapView
            style={styles.mapStyle}
            initialRegion={location}
            showsUserLocation={true}
            onRegionChange={region => setLocation(region)}
          >
            <MapView.Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude
              }}
              draggable
            />
          </MapView>
        )}
        <View style={styles.viewMapBtn}>
          <Button
            title="Guardar Ubicación"
            onPress={confirmLocation}
            containerStyle={styles.viewMapBtnContainerSave}
            buttonStyle={styles.viewMapBtnSave}
          />
          <Button
            title="Cancelar Ubicación"
            onPress={() => setIsVisibleMap(false)}
            containerStyle={styles.viewMapBtnContainerCancel}
            buttonStyle={styles.viewMapBtnCancel}
          />
        </View>
      </View>
    </Modal>
  );
} 

const styles = StyleSheet.create({

  pickercotain:{
    flexDirection: "row"

  },
  
  pickerPlace:{
      width: "50%"
  },

  viewPhoto: {
    alignItems: "center",
    height: 200,
    marginBottom: 20
  },
  viewImages: {
    flexDirection: "row",
    alignContent:"center",
    justifyContent: "center",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30
  },
  containerIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    height: 70,
    width: 70,
    backgroundColor: "#e3e3e3"
  },
  miniatureStyle: {
    width: 70,
    height: 70,
    marginRight: 10
  },
  viewForm: {
    marginLeft: 10,
    marginRight: 10
  },

 

  input: {
    marginBottom: 10
  },
  textArea: {
    height: 100,
    width: "100%",
    padding: 0,
    margin: 0
  },
  mapStyle: {
    width: "100%",
    height: 550
  },
  viewMapBtn: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10
  },
  viewMapBtnContainerSave: {
    paddingRight: 5
  },
  viewMapBtnSave: {
    backgroundColor: "#00a680"
  },
  viewMapBtnContainerCancel: {
    paddingLeft: 5
  },
  viewMapBtnCancel: {
    backgroundColor: "#a60d0d"
  },
  btnAddNido: {
    backgroundColor: "#00a680",
    margin: 20
  }
});
