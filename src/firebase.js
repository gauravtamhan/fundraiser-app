import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDsQuovPwB19S70P6xEpq_M5aF61fkOpfI",
    authDomain: "fundraiser-app-2cc96.firebaseapp.com",
    databaseURL: "https://fundraiser-app-2cc96.firebaseio.com",
    projectId: "fundraiser-app-2cc96",
    storageBucket: "fundraiser-app-2cc96.appspot.com",
    messagingSenderId: "816223918343"
};

firebase.initializeApp(firebaseConfig);

export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();