import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FeedbackIcon from '@material-ui/icons/Feedback';
import MapIcon from '@material-ui/icons/Map';
import React from 'react';
import { useAuth } from "../customHooks/useAuth";
import ListItemLink from "./listItemLink";
import { Divider, ListItemText, ListItemIcon } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar

}));

export default function AppDrawer() {
    const classes = useStyles();
    const auth = useAuth();

    if (auth.usuario && auth.apiKey) {
        return (
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.toolbar} />
                <List>
                    <ListItemLink to="/Mapa" primary="Mapa" icon={<MapIcon />} />
                    <ListItemLink to="/Avisos" primary="Avisos" icon={<FeedbackIcon />} />
                </List>
                <Divider />
                <List style={{ 'marginTop': 'auto' }}>
                    <ListItem onClick={() => {
                        auth.signout()
                    }}>
                        <ListItemIcon button>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText primary="Sair" />
                    </ListItem>
                </List>
            </Drawer>
        )
    } else {
        return null;
    }
}