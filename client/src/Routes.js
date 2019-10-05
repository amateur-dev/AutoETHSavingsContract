import React, { PureComponent } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import WelcomePage from './components/WelcomePage';
import FirstPage from './components/FirstPage';
import NotFound from './components/NotFound';

// eslint-disable-next-line react/prefer-stateless-function
class Routes extends PureComponent {
  render() {
    return (
      <div className="Route">
        <BrowserRouter>
          <Switch>
            <Route name="WelcomePage" path="/" exact component={WelcomePage} />
            <Route name="FirstPage" path="/FirstPage" exact component={FirstPage} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default Routes;
