import React, { useState, useRef } from "react";
import { View, Text } from "react-native";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";
//import AddTortugaFrom from "../../components/Restaurants/AddRestaurantForm";

export default function AddTortuga(props) {
  const { navigation } = props;
  //const { setIsReloadRestaurants } = navigation.state.params;
  //const toastRef = useRef();
  //const [isLoading, setIsLoading] = useState(false);

  return (
    <View>

            <Text>Añadiendo Nido</Text>

   {/*    <AddTortugaFrom
        toastRef={toastRef}
        setIsLoading={setIsLoading}
        navigation={navigation}
        setIsReloadRestaurants={setIsReloadRestaurants}
      />

      <Toast ref={toastRef} position="center" opacity={0.5} />
      <Loading isVisible={isLoading} text="Creando Restaurante" />
    */} 
    </View>
  );
}
