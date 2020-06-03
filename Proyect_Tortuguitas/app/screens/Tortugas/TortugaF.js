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

export default function TortugaF(props) {
  const { navigation } = props;
  const [tortugas, setTortugas] = useState([]);
  const [reloadTortugas, setReloadTortugas] = useState(false);
  const [isVisibleLoding, setIsVisibleLoading] = useState(false);
  const [userLogged, setUserLogged] = useState(false);
  const toastRef = useRef();



  firebase.auth().onAuthStateChanged(user => {
    user ? setUserLogged(true) : setUserLogged(false);
  });

  useEffect(() => {
    if (userLogged) {
      const idUser = firebase.auth().currentUser.uid;
      db.collection("tortugas")
        .where("Usuario", "==", idUser)
        .get()
        .then(response => {
          const idTortugasArray = [];          
          response.forEach(doc => {
            idTortugasArray.push(doc.id);
          });
          
           getDatatortugas(idTortugasArray).then(response => {
            const tortugasArray = [];
            response.forEach(doc => {
              const tortuga = doc.data();
              tortuga.id = doc.id;
              tortugasArray.push(tortuga); 
            });
            setTortugas(tortugasArray);
          }); 
        });
    }
    setReloadTortugas(false);
  }, [reloadTortugas,userLogged]);

  const getDatatortugas = idTortugasArray => {

    const arrayTortugas = [];
    idTortugasArray.forEach(idTortuga => {
      const result = db
        .collection("tortugas")
        .doc(idTortuga)
        .get();
      arrayTortugas.push(result);
    });
    return Promise.all(arrayTortugas);
  };

   if (!userLogged) {
    return (
      <UserNoLogged
        setReloadTortugas={setReloadTortugas}
        navigation={navigation}
      />
    );
  } 

  if(!tortugas){
    return <Loading isVisible = {true} text="Cargando Tortugas" />
  }

 
  if (tortugas.length === 0) {
    return <NotFoundtortugas setReloadTortugas={setReloadTortugas} />;
  } 

  return (
    <View style={styles.viewBody}>
     
      <NavigationEvents onWillFocus={() => setReloadTortugas(true)} />
      {tortugas ? (
         <FlatList
          data={tortugas}
          renderItem={tortuga => (
            <Tortuga
              tortuga={tortuga}
              navigation={navigation}
              setIsVisibleLoading={setIsVisibleLoading}
              setReloadTortugas={setReloadTortugas}
              toastRef={toastRef}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
       ) : (
        <View style={styles.loaderTortugas}>
          <ActivityIndicator size="large" />
          <Text>Cargando tortugas</Text>
        </View>
      )}
      <Toast ref={toastRef} position="center" opacity={1} />
      <Loading text="Eliminando tortuga" isVisible={isVisibleLoding} />
    
    
    </View>
  );
}

function Tortuga(props) {
  const {
    tortuga,
    navigation,
    setIsVisibleLoading,
    setReloadTortugas,
    toastRef
  } = props;
  const { id, nombre, images } = tortuga.item;
  const [imageTortuga, setImageTortuga] = useState(null);

   useEffect(() => {
    const image = images[0];
    firebase
      .storage()
      .ref(`tortugas/${image}`)
      .getDownloadURL()
      .then(response => {
        setImageTortuga(response);
      });
  }, []);

  const confirmRemoveTortuga = () => {
    Alert.alert(
      "Eliminar tortuga ",
      "¿Estas seguro de que quieres eliminar el tortuga de tu lista?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Eliminar",
          onPress: removeTortuga
        }
      ],
      { cancelable: false }
    );
  };

  const removeTortuga = () => {
    setIsVisibleLoading(true);
    db.collection("tortugas")
    .doc(id)
    .delete()
    .then(() => {
      setIsVisibleLoading(false);
      setReloadTortugas(true);
      toastRef.current.show("Tortuga eliminada correctamente");
    })
    .catch(() => {
      setIsVisibleLoading(false);
      toastRef.current.show("Error al eliminar la Tortuga");
    }); 
}; 



  return (
    <View style={styles.tortuga}>
        <TouchableOpacity
         onPress={() =>
          navigation.navigate("Tortuga", { tortuga: tortuga.item.id })
        } 
      > 
        <Image
          resizeMode="cover"
          source={{ uri: imageTortuga }}
          style={styles.image}
          PlaceholderContent={<ActivityIndicator color="#fff" />}
        />
       </TouchableOpacity> 
       <View style={styles.info}>
        <Text style={styles.name}>{nombre}</Text>
        <Icon
          type="material-community"
          name="minus-circle-outline"
          color="#00a680"
          containerStyle={styles.favorite}
          onPress={confirmRemoveTortuga}
          size={40}
          underlayColor="transparent"
        />
      </View>  

    </View>
  );
}

function NotFoundtortugas(props) {
  const { setReloadTortugas } = props;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <NavigationEvents onWillFocus={() => setReloadTortugas(true)} />
      <Icon type="material-community" name="alert-outline" size={50} />
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        No tienes tortugas en tu lista
      </Text>
    </View>
  );
} 



 function UserNoLogged(props) {
  const { setReloadTortugas, navigation } = props;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <NavigationEvents onWillFocus={() => setReloadTortugas(true)} />
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
  loaderTortugas: {
    marginTop: 10,
    marginBottom: 10
  },
  tortuga: {
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
  name: {
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
