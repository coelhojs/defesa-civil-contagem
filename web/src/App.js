import React from 'react';
import Inicio from './containers/Inicio';
import Dashboard from './containers/Dashboard';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Switch>
          <Route exact path="/" component={Inicio} />
          <Route path="/Dashboard" component={Dashboard} />
        </Switch>
    </div>
  );
}

export default App;
