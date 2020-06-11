import React,  { useState, useEffect } from "react";
import Navigation from "./app/navigations/Navigation";

//admins
import AdminNavegacion from "./app/navigations/AdminNavega/AdmidNavegacion";
import * as firebase from "firebase";

//

import { firebaseApp } from "./app/utils/FireBase";
import { YellowBox, Text } from "react-native";

YellowBox.ignoreWarnings(["Setting a timer"]);

export default function App() {

//
const [login, setLogin] = useState(null);
const [loginAdmin, setLoginAdmin] = useState(" ");


useEffect(() => {
  firebase.auth().onAuthStateChanged(user => {
   if(!user){
     setLogin(false);
   }else{
    setLoginAdmin(user.uid);
    setLogin(true);
    console.log("es use 2   "+user.uid)
    
   }
   //hasta aqui  
  });
}, []);
//Solo tenia  regresaba esto  return <Navigation />;

if(login && loginAdmin === "WQwxAPFnmFZezGVz6YsPaihCTRH3"){
  console.log("entro en use loger admin");
  return  <AdminNavegacion/>
}else{

  return <Navigation />;
}
}
