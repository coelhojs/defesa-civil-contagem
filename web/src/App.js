import React from 'react';
import { Route, Switch } from "react-router-dom";
import Signin from "./components/signin";
import Signup from "./components/signup";
import Dashboard from './containers/Dashboard';
import Inicio from './containers/Inicio';
import firebase from "firebase/app";
import "firebase/auth";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd
} from "@react-firebase/auth";
import { firebaseConfig } from "./controllers/Auth";

import { ProvideAuth } from "./controllers/Auth";

function App() {
  return (
    <div className="App">
      <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
        {/* <FirebaseAuthConsumer>
          {({ isSignedIn, user, providerId }) => {
            return (
              <pre style={{ height: 300, overflow: "auto" }}>
                {JSON.stringify({ isSignedIn, user, providerId }, null, 2)}
              </pre>
            );
          }}
        </FirebaseAuthConsumer> */}
        <Switch>
          <Route exact path="/" component={Inicio} />
          <Route path="/Dashboard" component={Dashboard} />
          <Route path="/Cadastro" component={Signup} />
          <Route path="/Login" component={Signin} />
        </Switch>
      </FirebaseAuthProvider>
    </div>
  );
}

export default App;
