import React, { Component } from 'react';
import './css/App.css';

import NavBar from './components/NavBar';
import Cliente from './components/Cliente';
import Servicios from './components/Servicios';

import { Switch, Route } from "react-router-dom";


class App extends Component {
  render(){
    return (
      <div>
        <NavBar/>
        <div className='container'>
          <Switch>
            <Route path="/cliente" exact component={Cliente}/>
            <Route path="/servicios" component={Servicios}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
