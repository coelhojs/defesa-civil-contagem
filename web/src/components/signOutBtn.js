import React, { useState } from 'react';
import { useAuth } from "../controllers/Auth";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
}));

export default function SignOutBtn(props) {
    const classes = useStyles();
    const auth = useAuth();
    console.log(auth);
    if (auth.user) {
        return (
            <Button variant="contained" color="primary" className={classes.button}
                onClick={() => auth.signout()}>
                Sair
                </Button>
        )
    } else {
        return null
    }
};