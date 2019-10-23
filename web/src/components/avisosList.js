//https://codeburst.io/how-to-fetch-data-from-an-api-with-react-hooks-9e7202b8afcd
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { useEffect, useState } from "react";
import { fetchAllAvisos } from '../controllers/Avisos';
import { useAuth } from '../customHooks/useAuth';
import AvisosItem from './avisosItem';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        paddingTop: '2rem',
        paddingBottom: '2rem'
    }
}));

export default function AvisosList() {
    const auth = useAuth();
    const classes = useStyles();
    const [avisos, setAvisos] = useState([]);
    //const [hasError, setErrors] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchAllAvisos();
            setAvisos(response.data);
        };
        fetchData();
    }, [avisos]);


    // const [state, setState] = React.useState({
    //     columns: [
    //         { title: '#', field: 'id' },
    //         { title: 'Tipo', field: 'tipo', type: 'numeric' },
    //         { title: 'Cidadão', field: 'cidadao' },
    //         { title: 'Data/Hora', field: 'timestamp' },
    //         { title: 'Cidadão', field: 'cidadao' },
    //         { title: 'Logradouro', field: 'logradouro' },
    //         { title: 'nº', field: 'numero' },
    //         { title: 'Bairro', field: 'bairro' },
    //     ],
    //     data: [
    //         { ...aviso },
    //     ],
    // });

    if (avisos && avisos.length > 0) {
        return (
            <GridList cellHeight={180} className={classes.gridList}>
                <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                    <ListSubheader component="div">
                        <Typography variant="h3" component="h2">
                            Lista de avisos
                        </Typography>
                    </ListSubheader>
                </GridListTile>
                {avisos.map(avisos => (
                    <AvisosItem key={avisos.id} avisos={avisos} />
                ))}
            </GridList>
        )
    } else {
        return (
            <h1>Não há avisos cadastrados</h1>
        )
    }
}