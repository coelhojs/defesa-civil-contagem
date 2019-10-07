import { useEffect, useState } from 'react';
import { useAuth } from '../customHooks/useAuth';
import { api } from "./index";

export const useFetchAllAvisos = aviso => {
    const auth = useAuth();
    const [avisos, setAvisos] = useState([]);

    useEffect(() => {
        (async aviso => {
            const response = await api.get('/Chamados', {},
                {
                    headers: {
                        'authorization': `Bearer ${auth.apiKey}`
                    }
                });
            setAvisos(response.data);
        })(aviso);
    },
        [aviso]
    );

    return avisos;
};
