import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Image, Text } from "react-native";
import { SearchBar, ListItem, Icon } from "react-native-elements";
import { useDebouncedCallback } from "use-debounce";
import { FireSQL } from "firesql";
import firebase from "firebase/app";

const fireSQL = new FireSQL(firebase.firestore(), { includeId: "id" });

export default function Search(props) {
  const { navigation } = props;
  const [tortugas, setTortugas] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    onSearch();
  }, [search]);

  const [onSearch] = useDebouncedCallback(() => {
    if (search) {
      fireSQL
        .query(`SELECT * FROM tortugas WHERE nombre LIKE '${search}%'`)
        .then(response => {
          setTortugas(response);
        });
    }
  }, 300);

  return (
    <View>
      <SearchBar
        placeholder="Busca tu tortuga por nombre..."
        onChangeText={e => setSearch(e)}
        value={search}
        containerStyle={styles.searchBar}
      />
      {tortugas.length === 0 ? (
        <NoFoundtortugas />
      ) : (
        <FlatList
          data={tortugas}
          renderItem={tortuga => (
            <Tortuga tortuga={tortuga} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
}

function Tortuga(props) {
  const { tortuga, navigation } = props;
  const { nombre, images } = tortuga.item;
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

  return (
    <ListItem
      title={nombre}
      leftAvatar={{ source: { uri: imageTortuga } }}
      rightIcon={<Icon type="material-community" nombre="chevron-right" />}
      onPress={() =>
        navigation.navigate("TortugaAdmB", { tortuga: tortuga.item.id })
      }
    />
  );
}

function NoFoundtortugas() {
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
