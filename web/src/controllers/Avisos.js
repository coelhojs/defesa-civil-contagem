import { useState, useEffect } from 'react';
import { api } from "./index";

export const useFetchAllAvisos = aviso => {
    const [avisos, setAvisos] = useState([]);

    useEffect(() => {
        (async aviso => {
            const response = await api.get('/Chamados');
            setAvisos(response.data);
        })(aviso);
    },
        [aviso]
    );

    return avisos;
};
