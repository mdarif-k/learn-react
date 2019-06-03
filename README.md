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
 First of all we need to inport firebase package into the App.js file.

 ```js
 import firebase from 'firebase';
 ```

Then we need to initialize the firebase app in App.js file.

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

 - #### On load component create operation + on post/added add operation
 #

The below function will work like subcription when ever any child we will add that time it automatic call the database ref. This below function will get the data once our component will call this function first time after that it will call on every add child.
 ```js
 this.db.ref('notes').on('child_added', snapshot => {
    let note = {
        id: snapshot.key,
        title: snapshot.val().title,
        note: snapshot.val().note
    }
    let notes = this.state.notes;
    notes.push(note);
    this.setState({
        notes: notes
    })
});
 ```


 


