import React, { useState } from 'react';
import { useAuth } from "../customHooks/useAuth";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import history from '../history';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
}));

export default function SignOutBtn(props) {
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