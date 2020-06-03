import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, ScrollView, Text, Dimensions } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import Loading from "../../components/Loading";
import Carousel from "../../components/Carousel";
import Map from "../../components/Map";
import Toast from "react-native-easy-toast";

import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";
import { Logs } from "expo";
const db = firebase.firestore(firebaseApp);

const screenWidth = Dimensions.get("window").width; 

export default function Nido(props) {
  const { navigation } = props;
  const { nido } = navigation.state.params;

  const [nidos, setNidos] = useState (null);

  const [imagesNido, setImagesNido] = useState([]);
  const toastRef = useRef();


useEffect(() => {
if(nidos) {
  const arrayUrls = [];
  (async () => {
    await Promise.all(
      nidos.images.map(async idImage => {
        await firebase
          .storage()
          .ref(`nidos/${idImage}`)
          .getDownloadURL()
          .then(imageUrl => {
            arrayUrls.push(imageUrl);
          });
      })
    );
    
    setImagesNido(arrayUrls);
  })();
}

}, [nidos]); 

  

   useEffect(() => {
       
      db.collection("nidos").doc(nido)
        .get()
        .then(response => {
          const datos = response.data();
          datos.id = response.id
          setNidos(datos);

        });
  }, []);
 

  if(!nidos) return <Loading  isVisible={true} text="Cargando Nido..." />;

  return (
    <ScrollView style={styles.viewBody}>

      <Carousel
        arrayImages={imagesNido} 
        width={screenWidth}
        height={250}
      />
       
        <TitleNido
        nidos={nidos}
        nombre={nido.nombre}
        descripcion={nido.descripcion}
        
         /> 

       <NidoInfo
       nidos={nidos}
        localización={nido.localización}
        nombre={nido.nombre}
        direccion={nido.direccion}
      /> 
     <Toast ref={toastRef} position="center" opacity={0.5} /> 
    </ScrollView>
  );
}




function TitleNido(props) {
  const {nidos} = props; 

  return (
    <View style={styles.viewnidoTitle}>
      <View style={{ flexDirection: "row" }}>
         <Text style={styles.nombreNido}>{nidos.nombre}</Text> 
       
      </View>
       <Text style={styles.descripcionNido}>{nidos.descripcion}</Text> 
    </View>
  );
}

function NidoInfo(props) {
 const {nombre, tamaño, tipo, direccion, fecha,localización } = props.nidos; 
 const nfecha = props.nidos.fecha.toDate().toDateString();
 
 const listInfo = [
    
    {
      text: tamaño,
      iconName: "arrow-split-vertical",
      iconType: "material-community",
      action: null
    }, 
     {
      text: tipo,
      iconName: (tipo === "Marina") ? "waves" :"image-filter-hdr",
      iconType: "material-community",
      action: null
    },
    {
     text: direccion,
        iconName: "map-marker",
        iconType: "material-community",
        action: null
      },

      {
          text: nfecha,
          iconName:"calendar-range",
          iconType: "material-community",
          action: null
      }  
  ];
 
  return (
    <View style={styles.viewNidoInfo}>
      <Text style={styles.NidoInfoTitle}>
        Información sobre el nido
      </Text>

      {listInfo.map((item, index) => (
          
        <ListItem
          key={index}
          
          title= {item.text}
          leftIcon={{
            name: item.iconName,
            type: item.iconType,
            color: "#00a680"
          }}
          containerStyle={styles.containerListItem}
        />
      ))}

       <Map localización={localización} nombre={nombre} height={100} /> 
      
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  },
  viewFavorite: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 2,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 100,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 5
  },
  viewnidoTitle: {
    margin: 15
  },
  nombreNido: {
    fontSize: 20,
    fontWeight: "bold"
  },
  rating: {
    position: "absolute",
    right: 0
  },
  descripcionNido: {
    marginTop: 5,
    color: "grey"
  },
  viewNidoInfo: {
    margin: 15,
    marginTop: 25
  },
  NidoInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10
  },
  containerListItem: {
    borderBottomColor: "#d8d8d8",
    borderBottomWidth: 1
  }
});
