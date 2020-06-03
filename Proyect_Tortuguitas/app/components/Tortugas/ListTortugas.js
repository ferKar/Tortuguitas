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

export default function ListTortugas(props) {
  const { tortugas, isLoading, handleLoadMore, navigation} = props;

  return (
    <View>
      {tortugas ? (
        <FlatList
          data={tortugas}
          renderItem={tortuga => (
            <Tortuga tortuga={tortuga} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={<FooterList isLoading={isLoading} />}
        />
      ) : (
        <View style={styles.loadertortugas}>
          <ActivityIndicator size="large" />
          <Text>Cargando Tortugaes</Text>
        </View>
      )}
    </View>
  );
}

function Tortuga(props) {
  const { tortuga, navigation } = props;
  const { nombre, dirección, descripción, images } = tortuga.item.tortuga;
  const [imageTortuga, setImageTortuga] = useState(null);

  useEffect(() => {
    const image = images[0];
    firebase
      .storage()
      .ref(`tortugas/${image}`)
      .getDownloadURL()
      .then(result => {
        setImageTortuga(result);
      });
  });

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Tortuga", {
          
          tortuga: tortuga.item.tortuga
        })
      }
    >
      <View style={styles.viewTortuga}>
        <View style={styles.viewTortugaImage}>
          <Image
            resizeMode="cover"
            source={{ uri: imageTortuga }}
            style={styles.imageTortuga}
            PlaceholderContent={<ActivityIndicator color="fff" />}
          />
        </View>
        <View>
          <Text style={styles.TortugaName}>{nombre}</Text>
          <Text style={styles.TortugaAddress}>{dirección}</Text>
          <Text style={styles.TortugaDescription}>
            {descripción.substr(0, 60)}...
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
      <View style={styles.loadingtortugas}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <View style={styles.notFoundRestuants}>
        <Text>No quedan Tortugas por cargar</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadingtortugas: {
    marginTop: 20,
    alignItems: "center"
  },
  viewTortuga: {
    flexDirection: "row",
    margin: 10
  },
  viewTortugaImage: {
    marginRight: 15
  },
  imageTortuga: {
    width: 80,
    height: 80
  },
  TortugaName: {
    fontWeight: "bold"
  },
  TortugaAddress: {
    paddingTop: 2,
    color: "grey"
  },
  TortugaDescription: {
    paddingTop: 2,
    color: "grey",
    width: 300
  },
  loadertortugas: {
    marginTop: 10,
    marginBottom: 10
  },
  notFoundRestuants: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center"
  }
});
