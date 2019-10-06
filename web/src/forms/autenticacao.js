import React, { useState, useEffect, useContext, createContext } from "react";
import Login from '../components/login';
import Cadastro from './cadastro';

const useStyles = makeStyles(theme => ({

}));


function AutenticacaoForm() {
    const classes = useStyles();
    const useFirebaseContext = createContext();
    const [usuario, setUsuario] = useState("");

    if (!usuario) {
        return (
            <Login ></Login>
        )
    } else {
        return (
            <Cadastro></Cadastro>
        )
    }
};

export default AutenticacaoForm;