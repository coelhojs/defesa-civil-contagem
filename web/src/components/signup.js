import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import GoogleLogin from 'react-google-login';
import { Link } from "react-router-dom";
import Header from '../components/header';
import { getUsuario } from '../controllers/Usuarios';

import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Send from '@material-ui/icons/Send';

import PersonalData from './personalData';
import ResidentialData from './residentialData';
import ChamadoData from './chamadoData';

const useStyles = makeStyles(theme => ({
    card: {
        minWidth: 275,
    },
    button: {
        margin: theme.spacing(1),
    },
    rightIcon: {
        marginLeft: theme.spacing(1),
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

const Signup = () => {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    Gestão de chamados
                    </Typography>
                <br />
                <Typography variant="body2" component="h3">
                    Cadastro
                </Typography>

                <CardContent><PersonalData /></CardContent>
                <CardContent><ResidentialData /></CardContent>
                {<CardContent><ChamadoData /></CardContent>}
            </CardContent>
            <CardActions>
                <Grid
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="flex-start"
                >
                    <Button variant="contained" color="secondary" className={classes.button}>
                        Cancelar
                    </Button>
                    <Button variant="contained" color="primary" className={classes.button}>
                        Enviar
                        <Send className={classes.rightIcon} />
                    </Button>
                </Grid>
                <Link to={"/Dashboard"} variant="contained"
                    color="primary" className={classes.button}>
                    Dashboard
                    </Link >
            </CardActions>
        </Card>
    );
};

export default Signup;