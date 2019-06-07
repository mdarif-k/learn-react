import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './Component/Navbar/Navbar';
import Footer from './Component/Footer/Footer';
import Blog from './Component/Blog/Blog';
import firebase from 'firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Component/Home/Home';
import Admin from './Component/Admin/Admin';

const firebaseConfig = {
  apiKey: "AIzaSyCl3BW7-1JZfk-gM4F9j58G49gIoI_3Keg",
  authDomain: "way2programming-firebase.firebaseapp.com",
  databaseURL: "https://way2programming-firebase.firebaseio.com",
  projectId: "way2programming-firebase",
  storageBucket: "way2programming-firebase.appspot.com",
  messagingSenderId: "280809409257",
  appId: "1:280809409257:web:15b25514ae296463"
}

firebase.initializeApp(firebaseConfig);

const INITIAL_STATE = {
  navData: []
}

class App extends Component {

  constructor(props) {
    super(props)
    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    this.db = firebase.database();
    this.listenForChange();
  }

  listenForChange = () => {
    this.db.ref('navData').on('child_added', snapshot => {
      let nav = snapshot.val();
      let navData = this.state.navData;
      navData.push(nav);
      this.setState({ navData: navData });
    });
  }

  render() {
    let loading = true;
    if (this.state.navData.length > 0) {
      loading = false
    }
    return (
      <BrowserRouter>
        <Navbar navData={this.state.navData} />
        <Route path='/:handle' component={Blog} blogData={this.state.blogData} />
        <Route exact path='/' component={Home} />
        <Route exact path='/admin' component={Admin} />
        {loading ? <div className="loading">Loading&#8230;</div> : null}
        <Footer />
      </BrowserRouter>
    )
  }
}

export default App;
