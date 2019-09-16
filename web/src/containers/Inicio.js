import React from 'react'; import { makeStyles } from '@material-ui/core/styles';
import Signin from "../components/signin";

const useStyles = makeStyles(theme => ({

}));


export default function Inicio(props) {
    const classes = useStyles();

    return (
        <div className={classes.content}>
            <Signin auth={props.auth} firebase={props.firebase} authProvider={props.authProvider} />
        </div>
    );
}