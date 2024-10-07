import firebase from "firebase/compat/app";
import "firebase/compat/database";



const firebaseConfig = {
  apiKey: "AIzaSyA55s42hoOamWSoq_BD9wd9YqVm1YJM1eQ",
  authDomain: "simcard-app-2aac0.firebaseapp.com",
  projectId: "simcard-app-2aac0",
  databaseURL: "https://simcard-app-2aac0-default-rtdb.asia-southeast1.firebasedatabase.app/",
  storageBucket: "simcard-app-2aac0.appspot.com",
  messagingSenderId: "708674694670",
  appId: "1:708674694670:web:b66f5bdcc9bae68467d65f"
};

const fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();


