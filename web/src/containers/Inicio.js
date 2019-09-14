import React, { useState } from 'react';
import Signin from "../components/signin";

export default function Inicio(props) {
    return (
        <div>
            <Signin firebase={props.firebase} authProvider={props.authProvider}></Signin>
        </div>
    );
}