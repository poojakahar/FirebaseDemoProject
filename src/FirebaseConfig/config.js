import * as firebase from "firebase";

var config = {
  apiKey: "AIzaSyBKZKV2QSDM0vWXkwA-aLoMzRWKj50NOeU",
  authDomain: "demoproject-c21f1.firebaseapp.com",
  databaseURL: "https://demoproject-c21f1.firebaseio.com",
  projectId: "demoproject-c21f1",
  storageBucket: "demoproject-c21f1.appspot.com",
  messagingSenderId: "857587852569"
};

let app=firebase.initializeApp(config);
export const db = app.database();