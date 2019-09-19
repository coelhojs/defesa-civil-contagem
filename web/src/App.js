import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import "firebase/auth";
import React from 'react';
import { Route, Switch } from "react-router-dom";
import AppDrawer from './components/drawer';
import Header from './components/header';
import Chamados from "./containers/Chamados";
import Mapa from "./containers/Mapa";
import Dashboard from './containers/Dashboard';
import Inicio from './containers/Inicio';
import { ProvideAuth } from "./customHooks/useAuth";
import Cadastro from "./forms/cadastro";
import ChamadoForm from "./forms/chamado";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  main: {
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
        <main className={classes.main}>
          <div className={classes.toolbar} />
          <Switch>ChamadoForm
            <Route exact path='/' component={Inicio} />
            <Route path="/Cadastro" component={Cadastro} />
            <Route path="/ChamadoForm" component={ChamadoForm} />
            <Route path="/Chamados" component={Chamados} />
            <Route path="/Dashboard" component={Dashboard} />
            <Route path="/Mapa" component={Mapa} />
          </Switch>
        </main>
      </div >
    </ProvideAuth>
  );
}

export default App;
