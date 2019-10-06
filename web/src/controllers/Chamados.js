import { useState, useEffect } from 'react';
import { api } from "./index";

export const useFetchAllChamados = chamado => {
    const [chamados, setChamados] = useState([]);

    useEffect(() => {
        (async chamado => {
            const response = await api.get('/Chamados');
            setChamados(response.data);
        })(chamado);
    },
        [chamado]
    );

    return chamados;
};
