# React + Firebase APP 2

In this branch we are going to learn React + Firebase communication and will create CURD Application.

In this application we are going to create Real time application for Notes. User can add, delete, modify and Get the notes from firebase database.

## Installation

Use the below package manager to install bootstrap and firebase

```bash
npm install --save firebase
npm install --save bootstrap
```

## Documentation

 - #### Configure Firebase
 #
 ```js
 import firebase from 'firebase';
 ```
 First of all we need to inport firebase package into the App.js file

 ```js
const firebaseConfig = {
  apiKey: "AIzaSyCPSA6kjor5jqIMqyzjPM79TZLf3zIY",
  authDomain: "react-firebase-learning.firebaseapp.com",
  databaseURL: "https://react-firebase-learning.firebaseio.com",
  projectId: "react-firebase-learning",
  storageBucket: "react-firebase-learning.appspot.com",
  messagingSenderId: "7244075497",
  appId: "1:72465075497:web:38a50e1b84763b02"
}
firebase.initializeApp(firebaseConfig);
 ```

 Then we need to initialize the firebase app in App.js file.


