import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Collapse from '@material-ui/core/Collapse';
import { red } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import clsx from 'clsx';
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
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function AvisosItem({ avisos }) {
    let history = useHistory();
    const classes = useStyles();
    const [aviso] = useState(avisos);
    const [expanded, setExpanded] = useState(false);

    function handleExpandClick() {
        setExpanded(!expanded);
    }

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
                <Button variant="contained" color="secondary" className={classes.button}
                    onClick={() => {
                        history.push(`/ProcessarAviso/${aviso.id}`)
                    }}
                >
                    Processar
      </Button>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph color="textSecondary" component="p">
                        {aviso.descricao}
                    </Typography>
                    <Typography paragraph color="textSecondary" component="p">
                        {aviso.descricao}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card >
    );
}