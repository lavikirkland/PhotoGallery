import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter } from  'react-router-dom' //Link,
import ImageGrid from './imageGrid';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <Route exact path="/" component={ImageGrid}/>
      </BrowserRouter>
    );
    // return (
    //   <div className="App">
    //     <header className="App-header">
    //       <img src={logo} className="App-logo" alt="logo" />
    //       <p>
    //         Edit <code>src/App.js</code> and save to reload.
    //       </p>
    //       <a
    //         className="App-link"
    //         href="https://reactjs.org"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Learn React
    //       </a>
    //     </header>
    //   </div>
    // );
  }
}

export default App;
