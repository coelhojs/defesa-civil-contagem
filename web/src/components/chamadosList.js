//https://codeburst.io/how-to-fetch-data-from-an-api-with-react-hooks-9e7202b8afcd
import React, { useState, useEffect } from "react";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import * as lodash from "lodash";

const useStyles = makeStyles(theme => ({
}));


export default function ChamadosList() {
    const classes = useStyles();
    const [hasError, setErrors] = useState(false);
    const [chamados, setChamados] = useState({});

    async function fetchData() {
        const res = await fetch("http://localhost:3004/chamados/");
        res
            .json()
            .then(res => setChamados(res))
            .catch(err => setErrors(err));
    }

    useEffect(() => {
        fetchData();
    })

    return (
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

        <span>{JSON.stringify(chamados)}</span>
        //         {/* <span>Has error: {JSON.stringify(hasError)}</span> */}
        //     </div>
    );
};