//https://codeburst.io/how-to-fetch-data-from-an-api-with-react-hooks-9e7202b8afcd
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { useEffect, useState } from "react";
import Aviso from '../components/aviso';
import { fetchAllAvisos } from '../customHooks/useAvisos';

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

export default function Avisos() {
    const classes = useStyles();
    const [avisos, setAvisos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchAllAvisos();
            setAvisos(response.data);
        };
        fetchData();
    }, []);

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
                    <Aviso key={avisos.id} avisos={avisos} />
                ))}
            </GridList>
        )
    } else {
        return (
            <h1>Não há avisos cadastrados</h1>
        )
    }
}