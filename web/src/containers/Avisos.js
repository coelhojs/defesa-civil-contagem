import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import * as React from 'react';
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Spinner from '../components/spinner';
import { fetchAllAvisos } from '../customHooks/useAvisos';

const useStyles = makeStyles({
    root: {
        borderRadius: '0px',
        height: '100%',
        width: '100%',
    },
    tableWrapper: {
        // maxHeight: 440,
        overflow: 'auto',
    },
});

export default function Chamados() {
    const [avisos, setAvisos] = useState(null);
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    let history = useHistory();

    const columns = [
        { field: 'idSequencia', title: 'ID', minWidth: 10 },
        { field: 'tipo', title: 'Tipo', minWidth: 50 },
        { field: 'data', title: 'Data', minWidth: 50 },
        { field: 'bairro', title: 'Bairro', minWidth: 50 },
        { field: 'status', title: 'Status', minWidth: 50 },
        { field: 'acao', title: '', minWidth: 50 },
    ];


    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchAllAvisos();
            setAvisos(response.data);
        };
        fetchData();

        // Limpa a assinatura antes do componente deixar a tela
        return () => {
            setAvisos(null);
        }
    }, []);

    if (avisos) {
        let rows = [];
        avisos.forEach((item) => {
            rows.push({
                id: item.id,
                idSequencia: item.idSequencia,
                tipo: item.tipo,
                data: moment.unix(item.timestamp).format("MM/DD/YYYY"),
                bairro: item.bairro,
                status: item.status,
                acao: (item.status == "Pendente") ? (
                    <Button variant="contained" color="primary" className={classes.button}
                        onClick={() => {
                            history.push(`/ProcessarAviso/${item.id}`)
                        }}
                    >Processar</Button>
                ) : (
                        <Button variant="contained" color="secondary" className={classes.button}
                            onClick={() => {
                                history.push(`/DetalhesAviso/${item.id}`)
                            }}
                        >Detalhes</Button>
                    )
            })
        })

        return (
            <Grid container spacing={3}>
                <Grid item md={1}>
                    <div className={classes.paper}>ID</div>
                </Grid>
                <Grid item md={2}>
                    <div className={classes.paper}>Tipo</div>
                </Grid>
                <Grid item md={2}>
                    <div className={classes.paper}>Data</div>
                </Grid>
                <Grid item md={3}>
                    <div className={classes.paper}>Bairro</div>
                </Grid>
                <Grid item md={2}>
                    <div className={classes.paper}>Status</div>
                </Grid>
                <Grid item md={2}>
                    <div className={classes.paper}></div>
                </Grid>
            </Grid>
        )
    } else {
        return <Spinner />
        //return "Não há chamados cadastrados"
    }
}