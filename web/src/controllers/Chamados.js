import { api } from "./index";
import { localdb } from "./index";

export const createChamado = async (formValues) => {
    try {
        const response = await localdb.post(`/Chamados`, { ...formValues },
            {});

        return response;

    } catch (e) {
        console.error(e)
    }
};

export const fetchAllChamados = async (apiKey) => {
    try {
        const response = await localdb.get('/Chamados', {},
            {});
        return response;

    } catch (e) {
        console.error(e)
    }
};