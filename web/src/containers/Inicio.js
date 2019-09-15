import React, { useState } from 'react';
import Signin from "../components/signin";

export default function Inicio(props) {
    return (
        <Signin auth={props.auth} firebase={props.firebase} authProvider={props.authProvider} />
    );
}