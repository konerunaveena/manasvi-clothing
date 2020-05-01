import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDtb24iuUMe3UPFV_DIXzYXQsZg3vsWBLQ",
    authDomain: "manasvi-db.firebaseapp.com",
    databaseURL: "https://manasvi-db.firebaseio.com",
    projectId: "manasvi-db",
    storageBucket: "manasvi-db.appspot.com",
    messagingSenderId: "112138086895",
    appId: "1:112138086895:web:308e306cd908f2e4ce6e1a",
    measurementId: "G-XVW9L75CX2"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider  = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({prompt : 'select_account'});

export const signInWIthGoogle  = () => auth.signInWithPopup(provider);


export default firebase;
