import React, { Component } from "react";
// import SimpleStorageContract from "./contracts/SimpleStorage.json";
// import getWeb3 from "./utils/getWeb3";
import Counter from "./components/TestComponent";
import FirstPage from "./components/FirstPage";
import NotFound from "./components/NotFound";
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

class Routes extends Component {

    render() {
        return (
          <div className="Route">

            <BrowserRouter>
            <Switch>
            <Route path="/Counter" exact component={Counter} />
            <Route path="/" exact component={FirstPage} />
            <Route component={NotFound} />
            </Switch>
            </BrowserRouter>
        </div>
        )
    }
};

export default Routes;