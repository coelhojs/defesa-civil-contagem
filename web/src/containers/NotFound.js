import * as React from "react";
import { useLocation } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
    },
}));

export default function NotFound() {
    const classes = useStyles();
    let location = useLocation();
    let pathname = location.pathname.substr(1);

    return (
        <div>
            <Paper className={classes.root}>
                <Typography variant="h5" component="h3">
                    Página <code>{pathname}</code> não encontrada.
        </Typography>
            </Paper>
        </div>
    );
}