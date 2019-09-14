import React, { useState, useEffect, useContext, createContext } from "react";
import Signin from './signin';
import Signup from './signup';

function SignForm() {
    const authContext = createContext();
    const [usuario, setUsuario] = useState("");

    if (!usuario) {
        return (
            <Signin ></Signin>
        )
    } else {
        return (
            <Signup></Signup>
        )
    }
};

export default SignForm;