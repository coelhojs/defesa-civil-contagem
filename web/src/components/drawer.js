import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import FeedbackIcon from '@material-ui/icons/Feedback';
import MapIcon from '@material-ui/icons/Map';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import SettingsIcon from '@material-ui/icons/Settings';
import React from 'react';
import { useAuth } from "../customHooks/useAuth";
import ListItemLink from "./listItemLink";

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

    if (auth.user) {
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
                    <ListItemLink to="/Avisos" primary="Avisos/Chamados" icon={<FeedbackIcon />} />
                    <ListItemLink to="/Usuários" primary="Usuários" icon={<PeopleAltIcon />} />
                </List>
                <Divider />
                <List>
                    <ListItemLink to="/Configurações" primary="Configurações" icon={<SettingsIcon />} />
                </List>
            </Drawer>
        )
    } else {
        return null;
    }
}