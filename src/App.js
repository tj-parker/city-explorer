import React, { Component } from 'react';
import CityForm from './components/CityForm';
import Weather from './components/Weather';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Weather />
        <CityForm />
      </div>
    )
  }


}

export default App;
