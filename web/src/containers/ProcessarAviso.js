import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Spinner from '../components/spinner';
import { fetchAviso } from '../customHooks/useAvisos';
import AvisoForm from '../forms/chamado';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
    },
}));

export default function ProcessarAviso() {
    const classes = useStyles();
    const [aviso, setAviso] = useState(null);

    let location = useLocation();
    let avisoId = location.pathname.split("/")

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchAviso(avisoId[2])
            setAviso(response.data);
        };
        fetchData();
    }, []);

    if (aviso) {
        return <AvisoForm aviso={aviso} />
    } else {
        return <Spinner />
    }
}