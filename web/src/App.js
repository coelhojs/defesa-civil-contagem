import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import "firebase/auth";
import * as React from 'react';
import { Route, Switch } from "react-router-dom";
import AppDrawer from './components/drawer';
import Header from './components/header';
import Avisos from "./containers/Avisos";
import CadastroRoute from "./containers/CadastroRoute";
import Chamados from "./containers/Chamados";
import Dashboard from './containers/Dashboard';
import DetalhesAviso from './containers/DetalhesAviso';
import Inicio from './containers/Inicio';
import Mapa from "./containers/Mapa";
import NotFound from "./containers/NotFound";
import PrivateRoute from './containers/PrivateRoute';
import ProcessarAviso from './containers/ProcessarAviso';
import { ProvideAuth } from "./customHooks/useAuth";
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
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    overflowY: 'auto',
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
            <Route path="/Cadastro" component={CadastroRoute} />
            {/* <PrivateRoute path="/Cadastro" component={Cadastro} /> */}
            <PrivateRoute exact path="/Avisos" component={Avisos} />
            <PrivateRoute exact path="/Chamados" component={Chamados} />
            <PrivateRoute exact path="/Dashboard" component={Dashboard} />
            <PrivateRoute exact path="/Mapa" component={Mapa} />
            <PrivateRoute exact path="/DetalhesAviso/:id" component={DetalhesAviso} />
            <PrivateRoute exact path="/ProcessarAviso/:id" component={ProcessarAviso} />
            <Route path="*" component={NotFound} />
          </Switch>
        </main>
      </ProvideAuth>
    </div >
  );
}

export default App;
