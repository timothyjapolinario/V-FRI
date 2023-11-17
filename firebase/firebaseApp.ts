import { initializeApp } from "firebase/app";
import { getStorage, list, listAll, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB9ejM1JXvt7YzcwR0EAk0UpcFUlLhIy7A",
  authDomain: "v-fri-a403e.firebaseapp.com",
  projectId: "v-fri-a403e",
  storageBucket: "v-fri-a403e.appspot.com",
  messagingSenderId: "1014763471953",
  appId: "1:1014763471953:web:ba59e4c3f4ee9b4cf3e470",
};
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase

export default firebaseApp;
