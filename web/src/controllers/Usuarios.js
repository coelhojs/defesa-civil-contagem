import { api } from "./index";
import history from '../history';

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