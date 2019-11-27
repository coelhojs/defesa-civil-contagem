import { api } from "./api";

export const fetchAviso = async (id) => {
    try {
        const response = await api.get(`/Avisos/${id}`);
        // const response = await api.get(`/admin/Avisos/${id}`);
        return response;

    } catch (e) {
        console.error(e)
    }
};

export const fetchAllAvisos = async (apiKey) => {
    try {
        const response = await api.get('/Avisos');
        // const response = await api.get('/admin/Avisos');
        return response;

    } catch (e) {
        console.error(e)
    }
};

export const updateAviso = async (aviso) => {
    try {
        const response = await api.put(`/Avisos/${aviso.id}`, { ...aviso });
        // const response = await api.put(`/admin/Avisos/${aviso.id}`, { ...aviso });
        return response;

    } catch (e) {
        console.error(e);
    }
}