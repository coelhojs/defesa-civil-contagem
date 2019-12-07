import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import DoneIcon from '@material-ui/icons/Done';
import "firebase/auth";
import * as React from "react";
import { useEffect } from "react";
import { useAuth } from '../customHooks/useAuth';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'absolute',
        bottom: '2rem',
        right: '3rem'
    }
}));


export default function WarnNotLoggedUser() {
    const auth = useAuth();
    const classes = useStyles();

    useEffect(() => {
        const warnUser = () => {
            if (auth.showWarning) {
                setTimeout(() => {
                    auth.toggleShowWarning()
                }, 3000);
            };
        }
        warnUser();
    }, [auth.showWarning]);

    if (auth.showWarning) {
        return (
            <Chip className={classes.root}
                color="secondary"
                deleteIcon={<DoneIcon />}
                label="Para utilizar o sistema, faça o login."
            // onDelete={auth.toggleShowWarning()} 
            />
        )
    } else {
        return null;
    }
}