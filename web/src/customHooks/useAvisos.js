import { api } from "./api";

export const fetchAviso = async (id) => {
    try {
        const response = await api.get(`/Avisos/${id}`);
        return response;

    } catch (e) {
        console.error(e)
    }
};

export const fetchAllAvisos = async (apiKey) => {
    try {
        const response = await api.get('/Avisos');
        return response;

    } catch (e) {
        console.error(e)
    }
};

export const updateAviso = async (aviso) => {
    try {
        const response = await api.put(`/Avisos/${aviso.id}`, { ...aviso });
        return response;

    } catch (e) {
        console.error(e);
    }
}