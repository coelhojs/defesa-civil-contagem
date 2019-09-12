import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import GoogleLogin from 'react-google-login';
import Header from '../components/header';
import { getUsuario } from '../controllers/Usuarios';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    card: {
        minWidth: 275,
    },
    button: {
        margin: theme.spacing(1),
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
}));

const successAuth = (response) => {
    try {
        let usuario = getUsuario(response.profileObj.email);

        if (usuario.existe) {
            //Acessar a aplicação
            console.log("Usuário logado")
            console.log(response)
        } else {
            //Formulario de cadastro
            console.log("Novo usuário. Cadastrar")
            console.log(response)
            return (
                <Route
                    render={() =>
                        (
                            <Redirect
                                to={{
                                    pathname: "/login"
                                }}
                            />
                        )
                    }
                />
            )

        }

    } catch (error) {
        console.log(error)
    }

}

const errorAuth = (response) => {
    console.log("Erro")
    console.log(response);
}

const Signin = () => {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    Gestão de chamados
                    </Typography>
                <br />
                <Typography variant="body2" component="p">
                    Login
                    </Typography>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={2}
                >
                    <GoogleLogin
                        clientId="802285435813-tvcihfesod96jgudcbvd56ur1123j81i.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={successAuth}
                        onFailure={errorAuth}
                        cookiePolicy={'single_host_origin'}
                    />
                </Grid>
            </CardContent>
            <CardActions>
                <Link to={"/Dashboard"} variant="contained"
                    color="primary" className={classes.button}>
                    Dashboard
                    </Link >
            </CardActions>
        </Card>
    );
};

export default Signin;