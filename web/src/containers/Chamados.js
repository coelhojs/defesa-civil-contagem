import * as React from 'react';
import { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import MaterialTable from 'material-table'
import { fetchAllChamados } from "../customHooks/useChamados";

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    tableWrapper: {
        maxHeight: 440,
        overflow: 'auto',
    },
});

export default function Chamados() {
    const [chamados, setChamados] = useState(null);
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const columns = [
        { field: 'idSequencia', title: 'ID', minWidth: 50 },
        { field: 'tipo', title: 'Tipo', minWidth: 80 },
        { field: 'bairro', title: 'Bairro', minWidth: 100 },
        { field: 'status', title: 'Status', minWidth: 100 },
    ];

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchAllChamados();
            setChamados(response.data);
        };
        fetchData();

        // Limpa a assinatura antes do componente deixar a tela
        return () => {
            setChamados(null);
        }
    }, []);

    if (chamados) {

        let rows = [];
        chamados.forEach((item) => {
            rows.push({
                id: item.id,
                idSequencia: item.idSequencia,
                tipo: item.tipo,
                bairro: item.endereco.bairro,
                status: item.status
            })
        })

        return (
            <Paper className={classes.root}>
                <MaterialTable
                    columns={columns}
                    data={rows}
                    title="Lista de chamados"
                    detailPanel={rowData => {
                        return (
                            <h4>Insira aqui os demais campos do chamado</h4>
                        )
                    }}
                    onRowClick={(event, rowData, togglePanel) => togglePanel()}
                />
            </Paper>
        )
    } else {
        return "Não há chamados cadastrados"
    }
}