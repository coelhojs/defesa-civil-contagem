import { api } from "./api";

export const createChamado = async (formValues) => {
    try {
        const response = await api.post(`/Ocorrencias`, { ...formValues });
        // const response = await api.post(`/admin/Ocorrencias`, { ...formValues });
        
        return response;

    } catch (e) {
        console.error(e)
    }
};

export const fetchAllOcorrencias = async (apiKey) => {
    try {
        const response = await api.get('/Ocorrencias');
        return response;

    } catch (e) {
        console.error(e)
    }
};