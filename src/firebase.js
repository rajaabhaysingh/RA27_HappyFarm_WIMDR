import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyA6a5wV4zZ8nW2_GnJLqsHGOZSYsQEgiVk",
  authDomain: "happyfarm-5b19a.firebaseapp.com",
  databaseURL: "https://happyfarm-5b19a.firebaseio.com",
  projectId: "happyfarm-5b19a",
  storageBucket: "happyfarm-5b19a.appspot.com",
  messagingSenderId: "681569469809",
  appId: "1:681569469809:web:8cdae9d9272fafc09ce2d0",
});

export { firebaseConfig as firebase };
