import React, { Component } from "react";
import Routes from "./Routes";
import getWeb3 from "./utils/getWeb3";

import "./App.css";

class App extends Component {

  render() {
    return (
      <div className="App">
        <Routes />
      </div>

    );
  }
}

export default App;
