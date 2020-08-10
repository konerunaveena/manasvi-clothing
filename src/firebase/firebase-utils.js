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
    // apiKey: "AIzaSyCewkwYPZ3qs4nv7MeK2-7vki--zENiutM",
    // authDomain: "mdatabase-99525.firebaseapp.com",
    // databaseURL: "https://mdatabase-99525.firebaseio.com",
    // projectId: "mdatabase-99525",
    // storageBucket: "mdatabase-99525.appspot.com",
    // messagingSenderId: "940429097350",
    // appId: "1:940429097350:web:36eab35ab63ca18a42d407",
    // measurementId: "G-2YHL6HDYZ2"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async(userAuth,additionalData) => {
    if(! userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.id}`);
    const snapShot = await userRef.get();
    
    const collectionRef = firestore.collection('users');
    const collectionSnapshot = await collectionRef.get();

   // console.log({collection : collectionSnapshot.docs.map(doc => doc.data())});

    if(! snapShot.exists){
        const { displayName,email} = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }
        catch(error){
            console.log("Error WHile Creating User ",error.messages);
        }
    }

    return userRef;
}

export const addCollectionAndItems  = async (collectionKey, objectsToAdd) =>{
    const collectionRef = firestore.collection(collectionKey);
    console.log(collectionRef);

    const batch =  firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        console.log(newDocRef);
        batch.set(newDocRef, obj);
    });
    return await batch.commit();
}

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection  = collections.docs.map(doc =>{
        const {title, items} = doc.data();
        return {
            routeName : encodeURI(title.toLowerCase()),
            id : doc.id,
            title,
            items
        }
    });

    //console.log(transformedCollection);
    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    },{})
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider  = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({prompt : 'select_account'});

export const signInWIthGoogle  = () => auth.signInWithPopup(provider);

export default firebase;
