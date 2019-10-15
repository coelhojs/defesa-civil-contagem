import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { useHistory } from "react-router-dom";
import { useAuth } from "../customHooks/useAuth";

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
}));

export default function SignOutBtn(props) {
    let history = useHistory();
    const classes = useStyles();
    const auth = useAuth();

    if (auth.usuario) {
        return (
            <Button variant="contained" color="primary" className={classes.button}
                onClick={() => {
                    auth.signout()
                    history.push('/')
                }}>
                Sair
                </Button>
        )
    } else {
        return null
    }
};