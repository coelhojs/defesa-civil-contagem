import { api } from "./index";
import { localdb } from "./index";

export const fetchAviso = async (id) => {
    try {
        const response = await localdb.get(`/Avisos/${id}`, {},
            {
            });
        return response;

    } catch (e) {
        console.error(e)
    }
};

export const fetchAllAvisos = async (apiKey) => {
    try {
        const response = await localdb.get('/Avisos', {},
            {
            });
        return response;

    } catch (e) {
        console.error(e)
    }
};
