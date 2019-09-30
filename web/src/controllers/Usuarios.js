import { api } from "./index";
import history from '../history';

export const cadastroUsuario = async (idToken, formValues) => {
    try {

        const response = await api.post(`/auth/cadastro`,
            { ...formValues },
            {
                headers: {
                    'authorization': `Bearer ${idToken}`
                }
            })
        console.log(response);
        if (response.data === "Usuário não cadastrado") {
            //Mandar pro form de cadastro
            console.log("não cadastrado.")
        }
    } catch (error) {
        console.error(error);
    }
}

export const loginUsuario = async idToken => {
    try {
        const response = await api.post(`/auth/login`, {},
            {
                headers: {
                    'authorization': `Bearer ${idToken}`
                }
            })
        if (response.data == "Usuário não cadastrado") {
            //Mandar pro form de cadastro
            console.log("não cadastrado.")
            history.push('/Cadastro');
        }
    } catch (error) {
        console.error(error);
    }
}

export const getUsuario = async email => {
    const response = await api.get(`/usuarios?email=${email}`);

    if (response.data.email == email) {
        console.log("Usuário existente. Logando")
        history.push('/Dashboard');
        return true;
    } else {
        console.log("Novo usuário. Redirecionando para o formulario")
        history.push('/Cadastro');
        return false;
    }
}