import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, ScrollView, Text, Dimensions } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import Loading from "../../components/Loading";
import Carousel from "../../components/Carousel";
import Map from "../../components/Map";
import Toast from "react-native-easy-toast";

//importaciones para editar
import Modal from "../../components/Modal";
import CambioTamaño from "../../components/Nido/CambioTamaño";
import CambioTipo from "../../components/Nido/CambioTipo";
import CambioDireccion from "../../components/Nido/CambioDireccion";

//acabnlas importacionces

import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";
import { Logs } from "expo";
const db = firebase.firestore(firebaseApp);

const screenWidth = Dimensions.get("window").width;

export default function Nido(props) {
  const { navigation } = props;
  const { nido } = navigation.state.params;
  const [nidos, setNidos] = useState(null);
  const [imagesNido, setImagesNido] = useState([]);
  const toastRef = useRef();

  //
  const [reloadData, setReloadData] = useState(false);
  //

  useEffect(() => {
    if (nidos) {
      const arrayUrls = [];
      (async () => {
        await Promise.all(
          nidos.images.map(async (idImage) => {
            await firebase
              .storage()
              .ref(`nidos/${idImage}`)
              .getDownloadURL()
              .then((imageUrl) => {
                arrayUrls.push(imageUrl);
              });
          })
        );

        setImagesNido(arrayUrls);
      })();
    }
  }, [nidos]);

  useEffect(() => {
    db.collection("nidos")
      .doc(nido)
      .get()
      .then((response) => {
        const datos = response.data();
        datos.id = response.id;
        setNidos(datos);
      });
  }, [reloadData]);

  if (!nidos) return <Loading isVisible={true} text="Cargando Nido..." />;

  return (
    <ScrollView style={styles.viewBody}>
      <Carousel arrayImages={imagesNido} width={screenWidth} height={250} />

      <TitleNido
        nidos={nidos}
        nombre={nido.nombre}
        descripcion={nido.descripcion}
      />

      <NidoInfo
        nidos={nidos}
        setReloadData={setReloadData}
        localización={nido.localización}
        nombre={nido.nombre}
        direccion={nido.direccion}
      />
      <Toast ref={toastRef} position="center" opacity={0.5} />
    </ScrollView>
  );
}

function TitleNido(props) {
  const { nidos } = props;

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
  const { id, nombre, tamaño, tipo, direccion, localización } = props.nidos;
  const nfecha = props.nidos.fecha.toDate().toDateString();

  //Prueba paa editar la tortugas estasdos
  const { setReloadData, toastRef } = props;
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);
  //const toastRef = useRef();
  //Acaban estados para editar componentes

  const listInfo = [
    {
      text: tamaño,
      iconName: "arrow-split-vertical",
      iconType: "material-community",
      iconRightName: "pencil-outline",
      onPress: () => selectedComponent("tamaño"),
      action: null,
    },
    {
      text: tipo,
      iconName: tipo === "Marina" ? "waves" : "image-filter-hdr",
      iconType: "material-community",
      iconRightName: "pencil-outline",
      onPress: () => selectedComponent("tipo"),
      action: null,
    },
    {
      text: direccion,
      iconName: "map-marker",
      iconType: "material-community",
      iconRightName: "pencil-outline",
      onPress: () => selectedComponent("dirección"),
      action: null,
    },

    {
      text: nfecha,
      iconName: "calendar-range",
      iconType: "material-community",
      iconRightName: "pencil-off",
      action: null,
    },
  ];

  //Prueba de renderizar componente para editas

  const selectedComponent = (key) => {
    switch (key) {
      case "tamaño":
        setRenderComponent(
          <CambioTamaño
            tamaño={tamaño}
            id={id}
            setReloadData={setReloadData}
            setIsVisibleModal={setIsVisibleModal}
            toastRef={toastRef}
          />
        );

        setIsVisibleModal(true);
        break;
      case "tipo":
        setRenderComponent(
          <CambioTipo
            tipo={tipo}
            id={id}
            setReloadData={setReloadData}
            setIsVisibleModal={setIsVisibleModal}
            toastRef={toastRef}
          />
        );
        setIsVisibleModal(true);

        break;

      case "dirección":
        setRenderComponent(
          <CambioDireccion
            direccion={direccion}
            id={id}
            setReloadData={setReloadData}
            setIsVisibleModal={setIsVisibleModal}
            toastRef={toastRef}
          />
        );
        setIsVisibleModal(true);

        break;

      default:
        break;
    }
  };

  //Acaba el codigo prueba

  return (
    <View style={styles.viewNidoInfo}>
      <Text style={styles.NidoInfoTitle}>Información sobre el nido</Text>

      {listInfo.map((item, index) => (
        <ListItem
          key={index}
          title={item.text}
          leftIcon={{
            name: item.iconName,
            type: item.iconType,
            color: "#00a680",
          }}
          rightIcon={{
            name: item.iconRightName,
            type: item.iconType,
            color: "#ccc",
          }}
          onPress={item.onPress}
          containerStyle={styles.containerListItem}
        />
      ))}

      <Map localización={localización} nombre={nombre} height={100} />
      {/* //Es para editar las tortuga */}
      {renderComponent && (
        <Modal isVisible={isVisibleModal} setIsVisible={setIsVisibleModal}>
          {renderComponent}
        </Modal>
      )}
      {/*   // aqui acaba */}
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
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
    paddingRight: 5,
  },
  viewnidoTitle: {
    margin: 15,
  },
  nombreNido: {
    fontSize: 20,
    fontWeight: "bold",
  },
  rating: {
    position: "absolute",
    right: 0,
  },
  descripcionNido: {
    marginTop: 5,
    color: "grey",
  },
  viewNidoInfo: {
    margin: 15,
    marginTop: 25,
  },
  NidoInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  containerListItem: {
    borderBottomColor: "#d8d8d8",
    borderBottomWidth: 1,
  },
});
