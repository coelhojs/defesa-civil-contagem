import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import "firebase/auth";
import React, { Component } from 'react'

import { useAuth } from "../customHooks/useAuth";
import { useForm } from "../customHooks/useForm";

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
    card: {
        margin: 'auto',
        maxWidth: 345,
        minWidth: 275,

    },
}));

const formInputs = {
    email: '',
    password: ''
}

const ColorButton = withStyles(theme => ({
    root: {
        color: theme.palette.getContrastText("#f46524"),
        backgroundColor: "#f46524",
        color: "white",
        '&:hover': {
            backgroundColor: "#a54318",
        },
    },
}))(Button);

const ColorTextField = withStyles(theme => ({
    root: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#f46524',
            },
        },
    },
}))(TextField);

export default function Login(props) {
    const classes = useStyles();
    const { values, errors, handleChange, handleSubmit } = useForm(callbackSubmit, formInputs);
    const auth = useAuth();

    function callbackSubmit() {
        auth.login(values.email, values.password)
    }

    return (
        <Card className={classes.card}>
            <CardContent>
                <CardMedia
                    component="img"
                    alt="Defesa Civil de Contagem - MG"
                    height="140"
                    image="../Imagens/escudo.jpg"
                    title="Defesa Civil de Contagem - MG"
                />
                <form onSubmit={handleSubmit}>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        spacing={2}
                    >
                        <ColorTextField
                            label="Email"
                            className={classes.textField}
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            autoComplete="email"
                            margin="normal"
                            variant="outlined"
                        />

                        <ColorTextField
                            label="Senha"
                            className={classes.textField}
                            type="password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            autoComplete="current-password"
                            margin="normal"
                            variant="outlined"
                        />
                        <Grid item>
                            <ColorButton variant="contained" color="#4CAF50"
                                type="submit" className={classes.button} >
                                Entrar
                            </ColorButton>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
            <CardActions>
                {/* <Link to={"/Dashboard"} variant="contained"
                    color="primary" className={classes.button}>
                    Dashboard
                    </Link > */}
            </CardActions>
        </Card>
    );
};