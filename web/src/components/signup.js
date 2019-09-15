import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Send from '@material-ui/icons/Send';
import React from 'react';
import { Link } from "react-router-dom";
import ChamadoData from './chamadoData';
import PersonalData from './personalData';
import ResidentialData from './residentialData';

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
                <CardContent><ChamadoData /></CardContent>
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