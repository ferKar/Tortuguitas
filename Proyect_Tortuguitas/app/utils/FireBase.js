import firebase from "firebase/app";

//NO MOSTRAR A NADIE
const firebaseConfig = {
  apiKey: "AIzaSyA9bed67KxJFibLo9kTVFNM-_-zJ-zqBfc",
  authDomain: "tortuguitas-eb87c.firebaseapp.com",
  databaseURL: "https://tortuguitas-eb87c.firebaseio.com",
  projectId: "tortuguitas-eb87c",
  storageBucket: "tortuguitas-eb87c.appspot.com",
  messagingSenderId: "849901457012",
  appId: "1:849901457012:web:68135990dca75ae7c38b21",
  measurementId: "G-JS3SJZBJTY"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
