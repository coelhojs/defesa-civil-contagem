import { useEffect, useState } from "react";
import { api } from "../controllers/index";
import history from '../history';
import { useAuth } from "./useAuth";

export const useApiAuth = () => {
    const auth = useAuth();
    const [usuario, setUsuario] = useState(null);
    const [idToken, setIdToken] = useState(null);
    const [apiKey, setApiKey] = useState(null);

    const loginUsuario = () => {
        try {
            auth.login().then(token => {
                setIdToken(token);
                api.post(`/auth/google/login`, {},
                    {
                        headers: {
                            'authorization': `Bearer ${token}`
                        }
                    })
                    .then(function (response) {
                        if (response.data.mensagem == "Usuário não cadastrado") {
                            history.push('/Cadastro');
                        } else {
                            setApiKey(response.data.api_key);
                            setUsuario(response.data.usuario);
                            history.push('/Dashboard')
                        }
                    })
            })
            console.log(apiKey)
            console.log(idToken)
            console.log(usuario)
        } catch (error) {

        }
    }

    return {
        loginUsuario
    };
}