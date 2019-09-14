import { api } from "./index";

export const getUsuario = async email => {
    const response = await api.get(`/Usuarios?email=${email}`);
    console.log(response);
    return await response;
};
