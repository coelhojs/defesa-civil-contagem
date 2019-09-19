import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react'; import { makeStyles } from '@material-ui/core/styles';
import SignOutBtn from './signOutBtn';

const useStyles = makeStyles(theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    link: {
        color: 'white'
    }
}));

export default function Header(props) {
    const classes = useStyles();

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <Typography variant="h6" noWrap>
                    <Link component={RouterLink} to="/" className={classes.link}>
                        Defesa Civil de Contagem
                    </Link>
                </Typography>
                <SignOutBtn />
            </Toolbar>
        </AppBar>
    );
}
