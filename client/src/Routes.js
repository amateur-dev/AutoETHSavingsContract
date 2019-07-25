import React, { Component } from "react";
// import SimpleStorageContract from "./contracts/SimpleStorage.json";
// import getWeb3 from "./utils/getWeb3";
import Counter from "./utils/TestComponent";
import HomeComponent from "./utils/HomeComponent";
import NotFound from "./utils/NotFound";
import { BrowserRouter, Route, Link } from 'react-router-dom';

class Routes extends Component {

    render() {
        return (
          <div className="Route">

            <BrowserRouter>
            <Route path="/Counter" exact component={Counter} />
            <Route path="/" exact component={HomeComponent} />
            <Route path="*" exact component={NotFound} />
            </BrowserRouter>
        </div>
        )
    }
};

export default Routes;