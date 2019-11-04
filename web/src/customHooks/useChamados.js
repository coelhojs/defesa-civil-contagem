import { api } from "./api";

export const createChamado = async (formValues) => {
    try {
        const response = await api.post(`/Chamados`, { ...formValues });
        
        return response;

    } catch (e) {
        console.error(e)
    }
};

export const fetchAllChamados = async (apiKey) => {
    try {
        const response = await api.get('/Chamados');
        return response;

    } catch (e) {
        console.error(e)
    }
};