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

export default function Tortuga(props) {
  const { navigation } = props;
  const { tortuga } = navigation.state.params;

  const [tortugas, setTortugas] = useState (null);

  const [imagesTortuga, setImagesTortuga] = useState([]);
  const toastRef = useRef();

  

 
useEffect(() => {
if(tortugas) {
  const arrayUrls = [];
  (async () => {
    await Promise.all(
      tortugas.images.map(async idImage => {
        await firebase
          .storage()
          .ref(`tortugas/${idImage}`)
          .getDownloadURL()
          .then(imageUrl => {
            arrayUrls.push(imageUrl);
          });
      })
    );
    
    setImagesTortuga(arrayUrls);
  })();
}

}, [tortugas]); 
 
  

   useEffect(() => {
       db.collection("tortugas").doc(tortuga)
        .get()
        .then(response => {
           const datos = response.data();
          datos.id = response.id
          setTortugas(datos); 
 
    console.log("use Effectr de response");
    console.log(response);
    console.log("use Effectr de response.data");
    console.log(response.data());

        });
  }, []); 
 
 

  if(!tortugas) return <Loading  isVisible={true} text="Cargando tortuga..." />;

  return (
    <ScrollView style={styles.viewBody}>
        
       <Carousel
         arrayImages={imagesTortuga}
        width={screenWidth}
        height={250}
      />
       
        <Titletortuga
        tortugas={tortugas}
        nombre={tortuga.nombre}
        descripcion={tortuga.descripcion}
        
         /> 

       <TortugaInfo
       tortugas={tortugas}
        localización={tortuga.localización}
        nombre={tortuga.nombre}
        genero={tortuga.genero}
        direccion={tortuga.dirección}
      />  
    
       <Toast ref={toastRef} position="center" opacity={0.5} />  
    </ScrollView>
  );
}




function Titletortuga(props) {
  const {tortugas} = props; 

  return (
    <View style={styles.viewtortugaTitle}>
      <View style={{ flexDirection: "row" }}>
         <Text style={styles.nombreTortuga}>{tortugas.nombre}</Text> 
       
      </View>
       <Text style={styles.descripcionTortuga}>{tortugas.descripcion}</Text> 
    </View>
  );
}

function TortugaInfo(props) {
 const {nombre, tamaño, tipo, dirección, genero, localización } = props.tortugas; 

const nfecha = props.tortugas.fecha.toDate().toDateString();
 


   const listInfo = [
    
    {
      text: tamaño,
      iconName: "arrow-split-vertical",
      iconType: "material-community",
     // iconRightName: "pencil-outline",
      action: null
    }, 
    {
        text: genero,
        iconName: (genero === "Desconocido") ? "help-circle-outline" :(genero === "Macho") ? "gender-male" : "gender-female",
        iconType: "material-community",
        //iconRightName: "pencil-outline",

        action: null
      },
     {
      text: tipo,
      iconName: (tipo === "Marina") ? "waves" :"image-filter-hdr",
      iconType: "material-community",
      //iconRightName: "pencil-outline",
      action: null
    },
    {
     text: dirección,
        iconName: "map-marker",
        iconType: "material-community",
        //iconRightName: "pencil-outline",
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
    <View style={styles.viewtortugaInfo}>
      <Text style={styles.tortugaInfoTitle}>
        Información sobre el tortuga
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
          /* rightIcon={{
              name: item.iconRightName,
              type: item.iconType,
              color: "#ccc"
          }} */
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
  viewtortugaTitle: {
    margin: 15
  },
  nombreTortuga: {
    fontSize: 20,
    fontWeight: "bold"
  },
  rating: {
    position: "absolute",
    right: 0
  },
  descripcionTortuga: {
    marginTop: 5,
    color: "grey"
  },
  viewtortugaInfo: {
    margin: 15,
    marginTop: 25
  },
  tortugaInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10
  },
  containerListItem: {
    borderBottomColor: "#d8d8d8",
    borderBottomWidth: 1
  }
});
