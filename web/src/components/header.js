import { Link } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { fade, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
}));

export default function Header(props) {
    //const auth = useAuth();
    const [firebase] = useState(props.firebase);

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="relative">
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        <Link to="/">
                            Defesa Civil de Contagem
                                            </Link>
                    </Typography>
                    <button
                        onClick={() => {
                            firebase.auth().signOut();
                            console.log(firebase)
                        }}
                    >
                        Sign Out
                    </button>
                    {/* {auth.user ? (
                        <div>
                            <Link to="/account">Account ({auth.user.email})</Link>
                            <button onClick={() => auth.signout()}>Signout</button>
                        </div>
                    ) : (
                            <Link to="/signin">Signin</Link>
                        )} */}
                </Toolbar>
            </AppBar>
        </div>
    );
}