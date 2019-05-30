import React, {Component} from 'react';
import './App.css';
import firebase from 'firebase';
import Header from './Component/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotesForm from './Component/Notes/NotesForm';
import DisplayNotes from './Component/Notes/DisplayNotes';

const firebaseConfig = {
  apiKey: "AIzaSyCPSA6kjor5q19jqIMqyzjPM79TZLf3zIY",
  authDomain: "react-firebase-learning.firebaseapp.com",
  databaseURL: "https://react-firebase-learning.firebaseio.com",
  projectId: "react-firebase-learning",
  storageBucket: "react-firebase-learning.appspot.com",
  messagingSenderId: "724654075497",
  appId: "1:724654075497:web:38a50e1b84763b02"
}
firebase.initializeApp(firebaseConfig);

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <section>
        <Header />
        <div className="container border mT20">
          <NotesForm />
          <DisplayNotes />
        </div>
      </section>
    )
  }
}

export default App;
