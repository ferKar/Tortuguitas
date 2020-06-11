import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import Loading from "../../components/Loading";
import UserGuest from "./UserGuest";
import UserLogged from "./UserLogged";

//Para admins
import UserLogAdmin from "../Administrador/UserLogAdmin";
//hast aqui

export default function MyAccount(props) {
  const [login, setLogin] = useState(null);
  const [loginAdmin, setLoginAdmin] = useState(" ");


  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
     //prueba de log en firebase
     /*  console.log("es use 1   "+user.providerData[0].displayName);
      console.log("es use 2   "+user.providerData[0].uid);
      console.log("es use 2   "+user.providerData[0].email);
      console.log("es use 2   "+user.uid);*/
      
      
     // !user ? setLogin(false) : setLogin(true);
     //De aqui hacia abajo es la prueba
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

  if (login === null) {
    return <Loading isVisible={true} text="Cargando..." />;
  }
  //Prueba para admin

  console.log("es el inicia de sesion login1 :  "+login, loginAdmin);
  
  if(login && loginAdmin === "WQwxAPFnmFZezGVz6YsPaihCTRH3"){
    console.log("entro en use loger admin");
    return <UserLogAdmin
              props={{props}}
              />
    
    
  }else{//tambie el if else

  //return <UserLogged />;
  console.log("entro en lo normal");
  return login ? <UserLogged /> : <UserGuest />;
  }
}
