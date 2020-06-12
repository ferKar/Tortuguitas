import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { Image } from "react-native-elements";
import * as firebase from "firebase";

export default function ListNidos(props) {
  const { nidos, isLoading, handleLoadMore, navigation} = props;

  return (
    <View>
      {nidos ? (
        <FlatList
          data={nidos}
          renderItem={nido => (
            <Nido nido={nido} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={<FooterList isLoading={isLoading} />}
        />
      ) : (
        <View style={styles.loadernidos}>
          <ActivityIndicator size="large" />
          <Text>Cargando nidos</Text>
        </View>
      )}
    </View>
  );
}

function Nido(props) {
  const { nido, navigation } = props;
  const { nombre, direccion, descripcion, images } = nido.item.nido;
  const [imageNido, setImageNido] = useState(null);
 

  console.log("buscamos el id ");
  console.log(nido.item.nido.id);


  useEffect(() => {
    const image = images[0];
    firebase
      .storage()
      .ref(`nidos/${image}`)
      .getDownloadURL()
      .then(result => {
        setImageNido(result);
      });
  });

  return (

    
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Nido", {  nido: nido.item.nido.id
        } )
        
      }
    >
      <View style={styles.viewNido}>
        <View style={styles.viewNidoImage}>
          <Image
            resizeMode="cover"
            source={{ uri: imageNido }}
            style={styles.imageNido}
            PlaceholderContent={<ActivityIndicator color="fff" />}
          />
        </View>
        <View>
          <Text style={styles.nidoName}>{nombre}</Text>
          <Text style={styles.nidoAddress}>{direccion}</Text>
          <Text style={styles.nidoDescription}>
            {descripcion.substr(0, 60)}...
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function FooterList(props) {
  const { isLoading } = props;

  if (isLoading) {
    return (
      <View style={styles.loadingnidos}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <View style={styles.notFoundRestuants}>
        <Text>No quedan nidos por cargar</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadingnidos: {
    marginTop: 20,
    alignItems: "center"
  },
  viewNido: {
    flexDirection: "row",
    margin: 10
  },
  viewNidoImage: {
    marginRight: 15
  },
  imageNido: {
    width: 80,
    height: 80
  },
  nidoName: {
    fontWeight: "bold"
  },
  nidoAddress: {
    paddingTop: 2,
    color: "grey"
  },
  nidoDescription: {
    paddingTop: 2,
    color: "grey",
    width: 300
  },
  loadernidos: {
    marginTop: 10,
    marginBottom: 10
  },
  notFoundRestuants: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center"
  }
});
