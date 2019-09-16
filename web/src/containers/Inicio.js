import React from 'react'; import { makeStyles } from '@material-ui/core/styles';
import Signin from "../components/signin";

export default function Inicio(props) {
    return (
        <Signin auth={props.auth} firebase={props.firebase} authProvider={props.authProvider} />
    );
}