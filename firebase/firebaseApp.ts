import { initializeApp } from "firebase/app";
import { getStorage, list, listAll, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDXvTFybFrnPIzm-vbY8u7rr2JVAM6ejGI",
  authDomain: "v-fri-ebafa.firebaseapp.com",
  projectId: "v-fri-ebafa",
  storageBucket: "v-fri-ebafa.appspot.com",
  messagingSenderId: "649045575573",
  appId: "1:649045575573:web:34ba5e7b120234cf2ad89c",
};
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase

export default firebaseApp;
