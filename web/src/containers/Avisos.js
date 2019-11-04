import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import moment from 'moment';
import * as React from 'react';
import { useEffect, useState } from "react";
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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const columns = [
        { field: 'idSequencia', title: 'ID', minWidth: 10 },
        { field: 'tipo', title: 'Tipo', minWidth: 50 },
        { field: 'data', title: 'Data', minWidth: 50 },
        { field: 'bairro', title: 'Bairro', minWidth: 50 },
        { field: 'status', title: 'Status', minWidth: 50 },
        { field: 'acao', title: '', minWidth: 50 },
    ];

    const fetchData = async () => {
        const response = await fetchAllAvisos();
        setAvisos(response.data);
    };

    useEffect(() => {
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
                bairro: item.endereco.bairro,
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
            <MaterialTable
                className={classes.root}
                columns={columns}
                data={rows}
                title="Lista de avisos"
            // detailPanel={rowData => {
            //     return (
            //         <h4>Insira aqui os demais campos do chamado</h4>
            //     )
            // }}
            // onRowClick={(event, rowData, togglePanel) => togglePanel()}
            />
        )
    } else {
        return <Spinner />
        //return "Não há chamados cadastrados"
    }
}