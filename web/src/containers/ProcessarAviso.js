import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Spinner from '../components/spinner';
import { useAuth } from "../customHooks/useAuth";
import { fetchAviso } from '../customHooks/useAvisos';
import AvisoForm from '../forms/aviso';

export default function ProcessarAviso() {
    const [aviso, setAviso] = useState(null);
    const auth = useAuth();

    let location = useLocation();
    let avisoId = location.pathname.split("/")

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchAviso(avisoId[2], auth.apiKey)
            setAviso(response);
        };
        fetchData();
    }, []);

    if (aviso) {
        return <AvisoForm aviso={aviso} />
    } else {
        return <Spinner />
    }
}