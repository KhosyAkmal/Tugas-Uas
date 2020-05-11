import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
 import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCPEOmj5aFzAjvrNsqBQ5Mn_hq9J_ETqv4",
    authDomain: "note-tugas-uts.firebaseapp.com",
    databaseURL: "https://note-tugas-uts.firebaseio.com",
    projectId: "note-tugas-uts",
    storageBucket: "note-tugas-uts.appspot.com",
    messagingSenderId: "911636960284",
    appId: "1:911636960284:web:b1ac57fb9849995dd7bbd9",
    measurementId: "G-LV88YS66KB"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const database = firebase.database();

  export default firebase;