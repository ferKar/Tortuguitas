
import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Image, Text } from "react-native";
import { SearchBar, ListItem, Icon } from "react-native-elements";
import { useDebouncedCallback } from "use-debounce";
import { FireSQL } from "firesql";
import firebase from "firebase/app";

const fireSQL = new FireSQL(firebase.firestore(), { includeId: "id" });

export default function Search(props) {
  const { navigation } = props;
  const [nidos, setNidos] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    onSearch();
  }, [search]);

  const [onSearch] = useDebouncedCallback(() => {
    if (search) {
      fireSQL
        .query(`SELECT * FROM nidos WHERE nombre LIKE '${search}%'`)
        .then(response => {
          setNidos(response);
        });
    }
  }, 300);

  return (
    <View>
      <SearchBar
        placeholder="Busca tu Nido por nombre..."
        onChangeText={e => setSearch(e)}
        value={search}
        containerStyle={styles.searchBar}
      />
      {nidos.length === 0 ? (
        <NoFoundnidos />
      ) : (
        <FlatList
          data={nidos}
          renderItem={nido => (
            <Nido nido={nido} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
}

function Nido(props) {
  const { nido, navigation } = props;
  const { nombre, images } = nido.item;
  const [imagenido, setImagenido] = useState(null);

  useEffect(() => {
    const image = images[0];
    firebase
      .storage()
      .ref(`nidos/${image}`)
      .getDownloadURL()
      .then(response => {
        setImagenido(response);
      });
  }, []);

  return (
    <ListItem
      title={nombre}
      leftAvatar={{ source: { uri: imagenido } }}
      rightIcon={<Icon type="material-community" nombre="chevron-right" />}
      onPress={() =>
        navigation.navigate("NidoAdmB", { nido: nido.item.id })
      }
    />
  );
}

function NoFoundnidos() {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Image
        source={require("../../../assets/img/no-result-found.png")}
        resizeMode="cover"
        style={{ width: 200, height: 200 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    marginBottom: 20
  }
});
