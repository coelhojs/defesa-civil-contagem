import React from 'react'; import { makeStyles } from '@material-ui/core/styles';
import Login from "../forms/login";
import { useAuth } from "../customHooks/useAuth";

const useStyles = makeStyles(theme => ({
}));

export default function Inicio(props) {
    const classes = useStyles();
    const auth = useAuth();

    if (auth.usuario) {
        return null
    } else {
        return (
            <div className={classes.content}>
                <Login auth={props.auth} firebase={props.firebase} authProvider={props.authProvider} />
            </div>
        )
    }
}