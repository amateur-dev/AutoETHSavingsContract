import React, { PureComponent } from 'react';
import Routes from './Routes';

import './App.css';

// eslint-disable-next-line react/prefer-stateless-function
class App extends PureComponent {
  render() {
    return (
      <div className="App">
        <Routes />
      </div>
    );
  }
}

export default App;
