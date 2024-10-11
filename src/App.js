import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import RegisterCompany from "./components/RegisterCompany";
import RegisterIndividual from "./components/RegisterIndividual";
import LoginIndividual from "./components/LoginIndividual";
import LoginCompany from "./components/LoginCompany";
import Success from "./components/Success";
import Verify from "./components/Verify";
import CreatePanel from "./components/CreatePanel";


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login/individual" exact component={LoginIndividual} />
          <Route path="/login/company" exact component={LoginCompany} />
          <Route path="/register/company" exact component={RegisterCompany} />
          <Route path="/register/individual" exact component={RegisterIndividual} />
          <Route path="/success" exact component={Success} />
          <Route path="/verify/:verifyToken" exact component={Verify} />
    
          <Route path="/createPanel" exact userKind="ADMIN" component={CreatePanel} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
