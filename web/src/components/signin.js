import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import "firebase/auth";
import React, { useState } from 'react';
import { classes } from '../styles';
import { Link } from "react-router-dom";
import { getUsuario } from "../controllers/Usuarios";

function Signin(props) {
    const [auth, setAuth] = useState(props.auth);
    const [authProvider] = useState(props.authProvider);
    const [firebase] = useState(props.firebase);
    const [usuario, setUsuario] = useState(null);

    const successAuth = (response) => {
        try {
            getUsuario(response.user.email).then(
                isAuth => setAuth(isAuth));
        } catch (error) {
            console.error(error)
        }
    }

    const errorAuth = (response) => {
        console.error("Erro")
        console.error(response);
    }

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
                            firebase.auth().signInWithPopup(googleAuthProvider)
                                .then(successAuth)
                                .catch(errorAuth);
                        }}
                    >
                        Entrar com a conta do Google
        </button>
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