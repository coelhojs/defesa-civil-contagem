import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import { red } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from 'moment';
import * as React from 'react';
import { useState } from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    card: {
        margin: 10,
        maxWidth: 250,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    avatar: {
        backgroundColor: red[500],
    },
    button: {
        margin: 'auto'
    }
}));

export default function AvisosItem({ avisos }) {
    let history = useHistory();
    const classes = useStyles();
    const [aviso] = useState(avisos);

    return (
        <Card className={classes.card}>
            <CardHeader
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={aviso.tipo}
                subheader={moment.unix(aviso.timestamp).format("DD/MM/YYYY hh:mm")}
            />
            <CardMedia
                className={classes.media}
                image={`${aviso.imagens[0]}`}
            />
            <CardActions disableSpacing>
                <Button variant="contained" color="primary" className={classes.button}
                    onClick={() => {
                        history.push(`/ProcessarAviso/${aviso.id}`)
                    }}
                >Processar</Button>
            </CardActions>
        </Card >
    );
}