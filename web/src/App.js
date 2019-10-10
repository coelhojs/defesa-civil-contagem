import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import "firebase/auth";
import React from 'react';
import { Route, Switch } from "react-router-dom";
import AppDrawer from './components/drawer';
import Header from './components/header';
import Avisos from "./containers/Avisos";
import Mapa from "./containers/Mapa";
import Dashboard from './containers/Dashboard';
import Inicio from './containers/Inicio';
import { ProvideAuth } from "./customHooks/useAuth";
import Cadastro from "./forms/cadastro";
import fundo from "./img/background.png";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100vh',
    backgroundImage: `url(${fundo})`,
    backgroundSize: 'cover',
    overflowY: 'auto',

  },
  main: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginBottom: '5rem'
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
        <main className={classes.main}>
          <div className={classes.toolbar} />
          <Switch>
            <Route exact path='/' component={Inicio} />
            <Route path="/Cadastro" component={Cadastro} />
            <Route path="/Avisos" component={Avisos} />
            <Route path="/Dashboard" component={Dashboard} />
            <Route path="/Mapa" component={Mapa} />
          </Switch>
        </main>
      </div >
    </ProvideAuth>
  );
}

export default App;
