import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Link } from "react-router-dom";
import Header from '../components/header';

const useStyles = makeStyles({
    card: {
        minWidth: 275,
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
});

export default function SimpleCard() {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <Container maxWidth="sm">
            <Header></Header>

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
                        {/* <Grid container className={classes.root} spacing={2}> */}
                        <form className={classes.container} noValidate autoComplete="off">
                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-email-input"
                                    label="Email"
                                    className={classes.textField}
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    margin="normal"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-password-input"
                                    label="Password"
                                    className={classes.textField}
                                    type="password"
                                    autoComplete="current-password"
                                    margin="normal"
                                    variant="outlined"
                                />
                            </Grid>
                        </form>
                    </Grid>
                </CardContent>
                <CardActions>
                    <Link to={"/Dashboard"}>Entrar</Link >
                </CardActions>
            </Card>
        </Container >
            );
}