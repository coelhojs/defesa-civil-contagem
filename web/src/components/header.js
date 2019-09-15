import { Link } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { classes } from '../styles';
import SignOutBtn from './signOutBtn';

export default function Header(props) {
    const [auth] = useState(props.auth);
    const [firebase] = useState(props.firebase);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        <Link to="/">Defesa Civil de Contagem</Link>
                    </Typography>
                    <SignOutBtn auth={auth} firebase={firebase} />
                </Toolbar>
            </AppBar>
        </div>
    );
}
