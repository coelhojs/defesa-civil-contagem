import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import "firebase/auth";
import * as React from "react";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import WarnNotLoggedUser from "../components/warnNotLoggedUser";
import { useAuth } from '../customHooks/useAuth';
import logo from "../img/logo.jpg";

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
        color: theme.palette.getContrastText("#f46524"),
        '&:hover': {
            backgroundColor: "#a54318",
        },
        backgroundColor: "#f46524",
    },
    card: {
        margin: 'auto',
        maxWidth: 345,
        minWidth: 275,

    },

}));

export default function Inicio() {
    const classes = useStyles();
    const auth = useAuth();
    const [makeRequest, setMakeRequest] = useState(false);
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    useEffect(() => {
        const login = async () => {
            if (makeRequest) {
                await auth.loginUsuario();
                history.replace(from);
            };
        }
        login();
    }, [makeRequest]);

    //TODO: Verificar se esse método é suficiente
    if (auth.usuario) {
        history.push('/Dashboard')
    }

    return (
        <div className={classes.content}>
            <Card className={classes.card}>
                <CardContent>
                    <CardMedia
                        component="img"
                        alt="Defesa Civil de Contagem - MG"
                        image={logo}
                        title="Defesa Civil de Contagem - MG"
                    />
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        spacing={2}
                    >
                        <Grid item>
                            <Button variant="contained"
                                type="submit" className={classes.button}
                                onClick={() => setMakeRequest(true)}>
                                Acessar
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <WarnNotLoggedUser />
        </div>
    );
}