import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert
} from "react-native";
import { Image, Icon, Button } from "react-native-elements";
import Loading from "../../components/Loading";
import Toast from "react-native-easy-toast";
import { NavigationEvents } from "react-navigation";

import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function Nidos(props) {
  const { navigation } = props;
  const [nidos, setNidos] = useState([]);
  const [reloadNidos, setReloadNidos] = useState(false);
  const [isVisibleLoding, setIsVisibleLoading] = useState(false);
  const [userLogged, setUserLogged] = useState(false);
  const toastRef = useRef();

  firebase.auth().onAuthStateChanged(user => {
    user ? setUserLogged(true) : setUserLogged(false);
  });



  useEffect(() => {
    if (userLogged) {
    const idUser = firebase.auth().currentUser.uid;

      db.collection("nidos")
        .where("usuario", "==", idUser )
        .get()
        .then(response => {
          const idNidosArray = [];
          response.forEach(doc => {   
          idNidosArray.push(doc.id);
          });

          getDataNidos(idNidosArray).then(response => {
            const nidos = [];
            response.forEach(doc => {
              let nido = doc.data();
              nido.id = doc.id;
              nidos.push(nido); 
            });
            setNidos(nidos);
          });
        });
    }
    setReloadNidos(false);
  }, [reloadNidos,userLogged]);


  const getDataNidos = idNidosArray => {
    const arrayNidos = [];
    idNidosArray.forEach(idNido => {
      const result = db
        .collection("nidos")
        .doc(idNido)
        .get();
      arrayNidos.push(result);
     
    });
    return Promise.all(arrayNidos);
  };
 
     if (!userLogged) {
    return (
      <UserNoLogged
        setReloadNidos={setReloadNidos}
        navigation={navigation}
      />
    );
  } 

  if(!nidos){
    return <Loading isVisible = {true} text="Cargando Nidos" />
  }
  
  if (nidos.length === 0) {
    return <NotFoundNidos setReloadNidos={setReloadNidos} />;
  } 
  
  return (
    <View style={styles.viewBody}>
      <NavigationEvents onWillFocus={() => setReloadNidos(true)} />
      {nidos ? (
        <FlatList
          data={nidos}
          renderItem={nido => (
            <Nido
              nido={nido}
              navigation={navigation}
              setIsVisibleLoading={setIsVisibleLoading}
              setReloadNidos={setReloadNidos}
              toastRef={toastRef}
            /> 
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <View style={styles.loaderNidos}>
          <ActivityIndicator size="large" />
          <Text>Cargando nidos</Text>
        </View>
      )}
      <Toast ref={toastRef} position="center" opacity={1} />
      <Loading text="Eliminando Nido" isVisible={isVisibleLoding} />
    </View>
  );
}

function Nido(props) {

  
  const {
    nido,
    navigation,
    setIsVisibleLoading,
    setReloadNidos,
    toastRef
  } = props;
  const {id, nombre, images } = nido.item;
  const [imageNido, setImageNido] = useState(null);

   useEffect(() => {
    const image = images[0];
    firebase
      .storage()
      .ref(`nidos/${image}`)
      .getDownloadURL()
      .then(response => {
        setImageNido(response);
      });
  },[]); //[imageNido]);//puse imagen nidos
 
  const confirmRemoveNido = () => {
    Alert.alert(
      "Eliminar Nido de la lista",
      "¿Estas seguro de que quieres eliminar el Nido de tu lista ?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Eliminar",
          onPress: removeNido
        }
      ],
      { cancelable: false }
    );
  }; 

   const removeNido = () => {
    setIsVisibleLoading(true);
    db.collection("nidos")
    .doc(nido.item.id)
    .delete()
    .then(() => {
      setIsVisibleLoading(false);
      setReloadNidos(true);
      toastRef.current.show("Nido  eliminado correctamente");
    })
    .catch(() => {
      setIsVisibleLoading(false);
      toastRef.current.show("Error al eliminar el Nido");
    });
  }; 

  return (
    <View style={styles.nido}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Nido",{ nido: nido.item.id })
        }
      >
        <Image
          resizeMode="cover"
          source={{uri: imageNido}} 
          
          style={styles.image}
          PlaceholderContent={<ActivityIndicator color="#fff" />}
        />
      </TouchableOpacity>
      <View style={styles.info}>
        <Text style={styles.nombre}>{nombre}</Text>
        <Icon
          type="material-community"
          name="minus-circle-outline"
          color="#00a680"
          containerStyle={styles.favorite}
           onPress={confirmRemoveNido} 
          size={40}
          underlayColor="transparent"
        />
      </View>
    </View>
  );
}

 function NotFoundNidos(props) {
  const { setReloadNidos } = props;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <NavigationEvents onWillFocus={() => setReloadNidos(true)} />
      <Icon type="material-community" name="alert-outline" size={50} />
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        No tienes nidos en tu lista
      </Text>
    </View>
  );
} 

 function UserNoLogged(props) {
  const { setReloadNidos, navigation } = props;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <NavigationEvents onWillFocus={() => setReloadNidos(true)} />
      <Icon type="material-community" name="alert-outline" size={50} />
      <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
        Necesitas estar logeado para ver esta sección.
      </Text>
      <Button
        title="Ir al login"
        onPress={() => navigation.navigate("Login")}
        containerStyle={{ marginTop: 20, width: "80%" }}
        buttonStyle={{ backgroundColor: "#00a680" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#f2f2f2"
  },
  loaderNidos: {
    marginTop: 10,
    marginBottom: 10
  },
  nido: {
    margin: 10
  },
  image: {
    width: "100%",
    height: 180
  },
  info: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: -30,
    backgroundColor: "#fff"
  },
  nombre: {
    fontWeight: "bold",
    fontSize: 20
  },
  favorite: {
    marginTop: -35,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 100
  }
});
