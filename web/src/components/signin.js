import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import GoogleLogin from 'react-google-login';
import * as firebase from "firebase/app";
import "firebase/auth";
import { Link } from "react-router-dom";

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

function Signin(firebase) {
    const [usuario, novoUsuario] = useState(null);

    const successAuth = (response) => {
        try {
            //            let usuario = getUsuario(response.WE.profileObj.email);

            if (usuario && usuario.existe) {
                //Acessar a aplicação
                console.log("Usuário logado")
            } else {
                //Formulario de cadastro
                novoUsuario({
                    "email": response.profileObj.email,
                    "nome": response.profileObj.givenName
                })
                console.log(usuario);
            }

        } catch (error) {
            console.log(error)
        }

    }

    const errorAuth = (response) => {
        console.log("Erro")
        console.log(response);
    }

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
                        <button
                        onClick={() => {
                            const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
                            firebase.auth().signInWithPopup(googleAuthProvider);
                        }}
                    >
                        Entrar com a conta do Google
        </button>

                    {/* <GoogleLogin
                        clientId="802285435813-tvcihfesod96jgudcbvd56ur1123j81i.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={successAuth}
                        onFailure={errorAuth}
                        cookiePolicy={'single_host_origin'}
                    /> */}
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