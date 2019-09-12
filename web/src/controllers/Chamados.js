import history from '../history';
import { api } from "./index";

export const getAllChamados = () => async dispatch => {
    const response = await api.get('/Chamados');
    dispatch({ type: "GET", payload: response });
};