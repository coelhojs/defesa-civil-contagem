import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import "firebase/auth";
import * as React from 'react';
import { Route, Switch } from "react-router-dom";
import AppDrawer from './components/drawer';
import Header from './components/header';
import Avisos from "./containers/Avisos";
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
    height: '100%'
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
            <Route exact path="/defesa-civil-contagem" component={Inicio} />
            <PrivateRoute exact path="/defesa-civil-contagem/Avisos" component={Avisos} />
            <PrivateRoute exact path="/defesa-civil-contagem/Mapa" component={Mapa} />
            <PrivateRoute exact path="/defesa-civil-contagem/DetalhesAviso/:id" component={DetalhesAviso} />
            <PrivateRoute exact path="/defesa-civil-contagem/ProcessarAviso/:id" component={ProcessarAviso} />
            <Route path="*" component={NotFound} />
          </Switch>
        </main>
      </ProvideAuth>
    </div >
  );
}

export default App;
