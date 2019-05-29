import React from 'react';
import logo from './logo.svg';
import './App.css';
import Contact from './Contact/Contact';
import { BrowserRouter, Route } from 'react-router-dom';
import Spinner from './Spinner/Spinner';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" component={Contact}></Route>
        <Spinner />
      </BrowserRouter>
    </div>
  );
}

export default App;
