import history from '../history';
import { api } from "./index";

export const getUsuario = email => async dispatch => {
    const response = await api.post(`/Usuarios/getUsuarios/${email}`);
    console.log(response);
    dispatch({ type: "POST", payload: response });
};