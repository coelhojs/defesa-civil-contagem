import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import * as React from 'react';
import { useEffect, useState } from "react";
import { fetchAllChamados } from "../customHooks/useChamados";
import Spinner from '../components/spinner';

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
    const [chamados, setChamados] = useState(null);
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

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

    const fetchData = async () => {
        const response = await fetchAllChamados();
        setChamados(response.data);
    };

    useEffect(() => {
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
                bairro: item.bairro,
                status: item.status
            })
        })

        return (
            <MaterialTable
                className={classes.root}
                columns={columns}
                data={rows}
                title="Lista de chamados"
                detailPanel={rowData => {
                    return (
                        <h4>Insira aqui os demais campos do chamado</h4>
                    )
                }}
                onRowClick={(event, rowData, togglePanel) => togglePanel()}
                localization={{
                    pagination: {
                        labelDisplayedRows: '{from}-{to} de {count}',
                        labelRowsSelect:'linhas',
                        labelRowsPerPage: 'linhas por página'
                    },
                    
                    toolbar: {
                        nRowsSelected: '{0} linha(s) selecionadas',
                        searchPlaceholder: 'Pesquisar',
                        searchTooltip: 'Pesquisar'
                    },
                    header: {
                        actions: 'Ações'
                    },
                    body: {
                        emptyDataSourceMessage: 'Sem registros para exibir',
                        filterRow: {
                            filterTooltip: 'Filtro'
                        }
                    }
                }}
            />
        )
    } else {
        return <Spinner />
        //return "Não há chamados cadastrados"
    }
}