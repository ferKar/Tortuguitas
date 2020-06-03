import React, { useState, useRef } from "react";
import { View, Text } from "react-native";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";
import AddNidosForm from "../../components/Nido/AddNidosForm";

export default function AddNido(props) {
  const { navigation } = props;
  //const {  } = navigation.state.params;
  const toastRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View>

      <AddNidosForm
        toastRef={toastRef}
        setIsLoading={setIsLoading}
        navigation={navigation}
        //setIsReloadRestaurants={setIsReloadRestaurants}
      />
 
      <Toast ref={toastRef} position="center" opacity={0.5} />
      <Loading isVisible={isLoading} text="Añadiendo Nido" />
    
    </View>
  );
}
