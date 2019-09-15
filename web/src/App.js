import Container from '@material-ui/core/Container';
import { FirebaseAuthProvider } from "@react-firebase/auth";
import * as firebase from "firebase/app";
import "firebase/auth";
import React, { useState } from 'react';
import { Route, Switch } from "react-router-dom";
import Header from './components/header';
import Signin from "./components/signin";
import Signup from "./components/signup";
import Dashboard from './containers/Dashboard';
import Inicio from './containers/Inicio';
import { firebaseConfig } from "./controllers/Auth";

function App() {
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  const [auth, setAuth] = useState(false);
  return (
    <div className="App">
      <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
        <Container maxWidth="sm">
          <Header auth={auth} firebase={firebase}></Header>
          <Switch>
            <Route
              exact path='/'
              render={(props) =>
                <Inicio
                  {...props}
                  auth={auth}
                  firebase={firebase}
                  authProvider={googleAuthProvider}
                />}
            />
            <Route path="/Dashboard" component={Dashboard} />
            <Route path="/Cadastro" component={Signup} />
            {/* <Route path="/Login" component={Signin} /> */}
          </Switch>
        </Container >
      </FirebaseAuthProvider>
    </div>
  );
}

export default App;
