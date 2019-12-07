import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FeedbackIcon from '@material-ui/icons/Feedback';
import GroupIcon from '@material-ui/icons/Group';
import MapIcon from '@material-ui/icons/Map';
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
                    <ListItemLink to="/NupDeC" primary="NupDeC" icon={<GroupIcon />} />
                </List>
                <Divider />
                <List>
                    <ListItemLink to="/" primary="Sair"
                        icon={<ExitToAppIcon />}
                        onClick={() => {
                            auth.signout()
                        }} />
                </List>
            </Drawer>
        )
    } else {
        return null;
    }
}