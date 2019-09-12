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
import { Switch, Route, Router, Link } from "react-router-dom";
import Header from '../components/header';
import { getUsuario } from '../controllers/Usuarios';
import Signin from '../components/signin';
import Signup from '../components/signup';

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

export default function SimpleCard() {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (
            <Container maxWidth="sm">
                <Header></Header>
                <Signin></Signin>
            </Container >
    );
}