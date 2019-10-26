import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ChamadoForm from '../forms/chamado';
import { fetchAviso } from '../controllers/Avisos'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
    },
}));

export default function ProcessarAviso() {
    const classes = useStyles();
    const [aviso, setAviso] = useState(null);

    let location = useLocation();
    let pathname = location.pathname;
    let avisoId = location.pathname.split("/")

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchAviso(avisoId[2])
            setAviso(response.data);
        };
        fetchData();
    }, [aviso]);

    if (aviso) {
        return <ChamadoForm aviso={aviso} />
    } else {
        return (
            <div className={classes.root} >
                <Typography variant="h5" component="h3">
                    Carregando aviso...
                </Typography>
            </div >
        )
    }
}