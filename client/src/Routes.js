import React, { Component } from "react";
// import SimpleStorageContract from "./contracts/SimpleStorage.json";
// import getWeb3 from "./utils/getWeb3";
import WelcomePage from "./components/WelcomePage"
import FirstPage from "./components/FirstPage";
import NotFound from "./components/NotFound";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class Routes extends Component {

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
        )
    }
};

export default Routes;