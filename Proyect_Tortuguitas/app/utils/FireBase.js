import firebase from "firebase/app";

//NO MOSTRAR A NADIE - tortuguitas
const firebaseConfig = {
  apiKey: "AIzaSyCuyto1yRWGHwIYNDREIuGQHE0FeNfa8Lw",
  authDomain: "tortuguitas-d5eba.firebaseapp.com",
  databaseURL: "https://tortuguitas-d5eba.firebaseio.com",
  projectId: "tortuguitas-d5eba",
  storageBucket: "tortuguitas-d5eba.appspot.com",
  messagingSenderId: "734034382642",
  appId: "1:734034382642:web:75ba213db164587673d12b"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
