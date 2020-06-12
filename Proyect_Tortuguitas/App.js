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


//console.log("es user APP ");




 firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    setLoginAdmin(user.uid);
    setLogin(true);
    
  } else {
    setLogin(false);  
  }
}); 

//Solo tenia  regresaba esto  return <Navigation />;

if(login && loginAdmin === "WQwxAPFnmFZezGVz6YsPaihCTRH3"){
  console.log("entro en use loger admin");
  return  <AdminNavegacion/>
}else{

  return <Navigation />;
}
}
