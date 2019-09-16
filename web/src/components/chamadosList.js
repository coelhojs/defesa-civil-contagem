//https://codeburst.io/how-to-fetch-data-from-an-api-with-react-hooks-9e7202b8afcd
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from "react";
import { useFetchAllChamados } from '../controllers/Chamados';
import ChamadosItem from './chamadosItem';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function ChamadosList() {
    const classes = useStyles();
    const chamados = useFetchAllChamados();
    const [hasError, setErrors] = useState(false);

    return (
        <GridList cellHeight={180} className={classes.gridList}>
            <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                <ListSubheader component="div">Lista de chamados</ListSubheader>
            </GridListTile>
            {chamados.map(chamados => (
                <ChamadosItem key={chamados.id} chamados={chamados} />
            ))}
        </GridList>
        //     <div>
        //         <Card >
        //             <CardActionArea>
        //                 <CardMedia
        //                     className={classes.media}
        //                     image={chamados.foto}
        //                 />
        //             </CardActionArea>
        //             <CardContent>
        //             </CardContent>
        //         </Card>

        // < span > { JSON.stringify(chamados) }</span >
        //         {/* <span>Has error: {JSON.stringify(hasError)}</span> */}
        //     </div>
    );
};