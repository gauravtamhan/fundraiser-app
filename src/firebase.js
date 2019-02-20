import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDBDS9c5M2X74MW3rAfjOMYNlZvkClLjlY",
    authDomain: "sample-app-d0c8e.firebaseapp.com",
    databaseURL: "https://sample-app-d0c8e.firebaseio.com",
    projectId: "sample-app-d0c8e",
    storageBucket: "sample-app-d0c8e.appspot.com",
    messagingSenderId: "328006132404"
};

firebase.initializeApp(firebaseConfig);

export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();