import { api } from "./api";

export const fetchAviso = async (id, apiKey) => {
    try {
        const result = await api.get(`/admin/avisos/${id}`, {},
            {
                headers: {
                    'authorization': `Bearer ${apiKey}`
                }
            })
            .then(function (response) {
                if (response.status == 200 && response.data) {
                    return response.data;
                }
                else {
                    return null;
                }
            });
        return result;

    } catch (e) {
        console.error(e)
    }
};

export const fetchAllAvisos = async (apiKey) => {
    try {
        const result = await api.get('/admin/avisos', {},
            {
                headers: {
                    'authorization': `Bearer ${apiKey}`
                }
            })
            .then(function (response) {
                if (response.status == 200 && response.data) {
                    return response.data;
                }
                else {
                    return null;
                }
            });
        return result;
    } catch (e) {
        console.error(e)
    }
};

export const updateAviso = async (aviso) => {
    try {
        const response = await api.put(`/admin/avisos/${aviso.id}`, { ...aviso });
        // const response = await api.put(`/admin/Avisos/${aviso.id}`, { ...aviso });
        return response;

    } catch (e) {
        console.error(e);
    }
}