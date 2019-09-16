import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { FirebaseAuthProvider } from "@react-firebase/auth";
import * as firebase from "firebase/app";
import "firebase/auth";
import React, { useState } from 'react';
import { Route, Switch } from "react-router-dom";
import AppDrawer from './components/drawer';
import Header from './components/header';
import Dashboard from './containers/Dashboard';
import Inicio from './containers/Inicio';
// import { firebaseConfig } from "./controllers/Auth";
import { ProvideAuth } from "./controllers/Auth";

import Cadastro from "./forms/cadastro";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar

}));

function App(props) {
  const classes = useStyles();

  return (
    <ProvideAuth>
      <div className={classes.root}>
        <CssBaseline />
        <Header ></Header>
        <AppDrawer />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route exact path='/' component={Inicio} />
            <Route path="/Dashboard" component={Dashboard} />
            <Route path="/Cadastro" component={Cadastro} />
            {/* <Route path="/Login" component={Signin} /> */}
          </Switch>
        </main>
      </div >
    </ProvideAuth>
  );
}

export default App;
