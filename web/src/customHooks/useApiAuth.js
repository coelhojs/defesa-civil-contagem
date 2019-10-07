import { api } from "../controllers/index";
import history from '../history';
import { useAuth } from "./useAuth";

export const useApiAuth = () => {
    const auth = useAuth();

    const loginUsuario = async () => {
        return auth.login()
            .then(token => {
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
                            // history.push('/Dashboard')
                        }
                    })
                return token;
            })
    }

    return {
        loginUsuario
    };
}