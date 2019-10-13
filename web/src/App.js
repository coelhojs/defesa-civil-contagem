import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import "firebase/auth";
import * as React from 'react';
import { Route, Switch } from "react-router-dom";
import AppDrawer from './components/drawer';
import Header from './components/header';
import Avisos from "./containers/Avisos";
import Dashboard from './containers/Dashboard';
import Inicio from './containers/Inicio';
import Mapa from "./containers/Mapa";
import NotFound from "./containers/NotFound";
import PrivateRoute from './containers/PrivateRoute';
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

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ProvideAuth>
        <CssBaseline />
        <Header ></Header>
        <AppDrawer />
        <main className={classes.main}>
          <div className={classes.toolbar} />
          <Switch>
            <Route exact path='/' component={Inicio} />
            <Route path="/Cadastro" component={Cadastro} />
            {/* <PrivateRoute path="/Cadastro" component={Cadastro} /> */}
            <PrivateRoute path="/Avisos" component={Avisos} />
            <PrivateRoute path="/Dashboard" component={Dashboard} />
            <PrivateRoute path="/Mapa" component={Mapa} />
            <Route path="*" component={NotFound} />
          </Switch>
        </main>
      </ProvideAuth>
    </div >
  );
}

export default App;
