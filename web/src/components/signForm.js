import React, { useState, useEffect, useContext, createContext } from "react";
import Signin from './signin';
import Cadastro from '../forms/cadastro';

function SignForm() {
    const authContext = createContext();
    const [usuario, setUsuario] = useState("");

    if (!usuario) {
        return (
            <Signin ></Signin>
        )
    } else {
        return (
            <Cadastro></Cadastro>
        )
    }
};

export default SignForm;