import AppBar from '@material-ui/core/AppBar';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from "../customHooks/useAuth";

const useStyles = makeStyles(theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: "#f46524",
        height: '10%'
    },
    toolBar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    link: {
        color: 'white',
    }
}));

export default function Header(props) {
    const classes = useStyles();
    const auth = useAuth();

    if (auth.usuario && auth.apiKey) {
        return (
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.toolBar}>
                    <Typography variant="h6" noWrap>
                        <Link component={RouterLink} to="/" className={classes.link}>
                            Defesa Civil de Contagem
                    </Link>
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    } else {
        return null;
    }
}