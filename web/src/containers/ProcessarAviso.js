import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import * as React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchAviso } from '../controllers/Avisos';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
    },
}));

export default function ProcessarAviso() {
    const classes = useStyles();
    const [aviso, setAviso] = useState([]);
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
        return (
            <div className={classes.root} >
                <Typography variant="h5" component="h3">
                    {aviso.tipo}
                </Typography>
            </div >
        )
    } else {
        return "Carregando aviso";
    }
}