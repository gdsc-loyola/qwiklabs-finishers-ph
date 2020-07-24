//import * from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyA0a6f7wUG2hZRXaZzOpOTIIeh98X3JHaM",
    authDomain: "qwiklabs-finishers-ph-e7667.firebaseapp.com",
    databaseURL: "https://qwiklabs-finishers-ph-e7667.firebaseio.com",
    projectId: "qwiklabs-finishers-ph-e7667",
    storageBucket: "qwiklabs-finishers-ph-e7667.appspot.com",
    messagingSenderId: "763693016310",
    appId: "1:763693016310:web:aba46f96591e70c1bb38d7",
    measurementId: "G-QFLCCKXFQH"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.firestore();

// Create a root reference
//const storageRef = firebase.storage().ref();
//module.export (storageRef);
