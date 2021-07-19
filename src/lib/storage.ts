import firebase from "firebase";

const firebaseConfig = {
  storageBucket: "photo-viewer-11ad1.appspot.com"
};

firebase.initializeApp(firebaseConfig);

export default firebase.storage();
