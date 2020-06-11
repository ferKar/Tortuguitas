import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import {Image} from "react-native-elements";
import { Button } from "react-native-elements";
import * as firebase from "firebase";
import InfoUser from "../../components/Account/InfoUser";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";
import AccountOptions from "../../components/Account/AccountOptions";

//par admi
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
//aqiu

export default function UserLogAdmin(props) {
//  const ver = props.navigation.visible;
  const [userInfo, setUserInfo] = useState({});
  const [reloadData, setReloadData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [textLoading, setTextLoading] = useState("");
  const toastRef = useRef();

  console.log("es navegacion");

  

  useEffect(() => {
    (async () => {
      const user = await firebase.auth().currentUser;
      setUserInfo(user.providerData[0]);
    })();
    setReloadData(false);
  }, [reloadData]);

    
 

  return (
      <>
  {/*   <View style= {styles.viewImgan}>
    <Image style= {styles.imagenGif}
    source={require("../../../assets/img/tortuga1.jpeg")}
    />

    <View style={{alignItems: "center"}}>
        <Text style={styles.textB}>Bienvinido</Text>
        <Text style={{fontSize:30, fontWeight:"bold"}}>Administrador</Text>
        <Text style={styles.textContex}>Como administrador puede ver todas las tortugas y nidos subidas por los usuarios tambien puedes visualizar su ubicación </Text>
    </View>

    </View> */}
    
    <View  /* style={styles.viewUserInfo}  */>
    <Image style= {styles.imagenGif}
    source={require("../../../assets/img/tortuga1.jpeg")}
    />

    <View style={{alignItems: "center"}}>
        <Text style={styles.textB}>Bienvinido</Text>
        <Text style={{fontSize:30, fontWeight:"bold"}}>Administrador</Text>
        <Text style={styles.textContex}>Como administrador puede ver todas las tortugas y nidos subidas por los usuarios tambien puedes visualizar su ubicación </Text>
    </View>
     {/*   <InfoUser
        userInfo={userInfo}
        setReloadData={setReloadData}
        toastRef={toastRef}
        setIsLoading={setIsLoading}
        setTextLoading={setTextLoading}
      />
      <AccountOptions
        userInfo={userInfo}
        setReloadData={setReloadData}
        toastRef={toastRef}
      />
 */}

      <Button
        title="Cerrar sesión"
        buttonStyle={styles.btnCloseSession}
        titleStyle={styles.btnCloseSessionText}
        onPress={() => firebase.auth().signOut()}
      />

      <Toast ref={toastRef} position="center" opacity={0.5} />
      <Loading text={textLoading} isVisible={isLoading} /> 
    </View>
    </>
  );
}


    


const styles = StyleSheet.create({
  viewUserInfo: {
    minHeight: "100%",
    backgroundColor: "#f2f2f2"
  },
  btnCloseSession: {
    marginTop: 30,
    borderRadius: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e3e3e3",
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
    paddingTop: 10,
    paddingBottom: 10
  },
  btnCloseSessionText: {
    color: "#00a680"
  },

  textB:{
    fontSize: 35,
    fontWeight: "bold",
    justifyContent: "center",
  
  },

  textContex:{
    fontSize: 20,
    fontWeight: "bold",
    justifyContent: "center",
    textAlign: "center",
    textAlignVertical: "center",
    color: "#00a680"

  },

  viewImgan:{
      flex:1,
    width: windowWidth,
    height: windowHeight
  },
  imagenGif:{
    
    height: "50%",
    width: "100%"


  }
});
