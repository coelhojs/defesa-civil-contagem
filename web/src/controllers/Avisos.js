import { api } from "./index";

export const fetchAllAvisos = async (apiKey) => {
    try {
        const response = await api.get('/dev/Chamados', {},
            {
                headers: {
                    'authorization': `Bearer ${apiKey}`
                }
            });
        return response;

    } catch (e) {
        console.error(e)
    }
};
