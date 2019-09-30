import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import "firebase/auth";
import React from 'react';
import { useAuth } from "../customHooks/useAuth";
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

export default function Login(props) {
    const classes = useStyles();
    const auth = useAuth();

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
                    {/* <TextField
                        label="Email"
                        className={classes.textField}
                        type="email"
                        name="email"
                        autoComplete="email"
                        margin="normal"
                        variant="outlined"
                    />

                    <TextField
                        label="Password"
                        className={classes.textField}
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        margin="normal"
                        variant="outlined"
                    /> */}

                    <button onClick={() => { auth.login() }} >
                        Entrar
                    </button>
                </Grid>
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