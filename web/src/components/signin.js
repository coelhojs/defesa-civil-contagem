import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import "firebase/auth";
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { getUsuario } from "../controllers/Usuarios";

function Signin(props) {
    const [authProvider] = useState(props.authProvider);
    const [firebase] = useState(props.firebase);
    const [usuario, setUsuario] = useState(null);

    const successAuth = (response) => {
        try {
            let usuario = getUsuario(response.user.email);
            console.log(usuario)

            if (usuario && usuario.existe) {
                //Acessar a aplicação
                console.log("Usuário logado")
            } else {
                //Formulario de cadastro
                setUsuario({
                    "email": response.user.email,
                    "nome": response.user.displayName
                })
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

export default Signin;