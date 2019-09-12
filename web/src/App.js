import React from 'react';
import Inicio from './containers/Inicio';
import Dashboard from './containers/Dashboard';
import Signup from "./components/signup";
import Signin from "./components/signin";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Inicio} />
        <Route path="/Dashboard" component={Dashboard} />
        <Route path="/Cadastro" component={Signup} />
        <Route path="/Login" component={Signin} />
      </Switch>
    </div>
  );
}

export default App;
