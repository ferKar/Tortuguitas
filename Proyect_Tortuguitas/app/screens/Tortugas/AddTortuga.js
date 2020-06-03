import React, { useState, useRef } from "react";
import { View, Text } from "react-native";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";
import AddTortugaForm from "../../components/Tortugas/AddTortugasForm";

export default function AddTortuga(props) {
  const { navigation } = props;
 // const { setIsReloadTortugas } = navigation.state.params;
  const toastRef = useRef();
  const [isLoading, setIsLoading] = useState(false);



  return (
    <View>

    
            

     <AddTortugaForm
        
         toastRef={toastRef}
         setIsLoading={setIsLoading}
         navigation={navigation}
         //setIsReloadTortugas={setIsReloadTortugas}
      
        />

       
      <Toast ref={toastRef} position="center" opacity={0.5} />
      <Loading isVisible={isLoading} text="Añadiendo Tortuga" />
   

 </View>
  );
}
