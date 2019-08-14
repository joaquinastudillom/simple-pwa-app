import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/messaging";
import "firebase/storage";

const config = {
    apiKey: "AIzaSyC-x_P9Jb3VSJpMSx-E6j4dBu4DzkW8tus",
    authDomain: "simple-pwa-app.firebaseapp.com",
    databaseURL: "https://simple-pwa-app.firebaseio.com",
    projectId: "simple-pwa-app",
    storageBucket: "simple-pwa-app.appspot.com",
    messagingSenderId: "519093170196",
    appId: "1:519093170196:web:ff70fef7a04b304f"
};

firebase.initializeApp(config);

let db = firebase.firestore();

db.enablePersistence({ synchronizeTabs: true });

const storage = firebase.storage();
const messaging = firebase.messaging();

export default { db, storage, messaging };