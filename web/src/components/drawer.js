import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import ListItemLink from "./listItemLink";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import FeedbackIcon from '@material-ui/icons/Feedback';
import MapIcon from '@material-ui/icons/Map';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import SettingsIcon from '@material-ui/icons/Settings';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Chamados from '../containers/Chamados';
import { useAuth } from "../customHooks/useAuth";

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
                
                    <ListItem button key="Mapa" disabled>
                        <ListItemIcon>
                            <MapIcon />
                        </ListItemIcon>
                        <ListItemText primary="Mapa" />
                    </ListItem>
                
                    <ListItemLink to="/Chamados" primary="Chamados" icon={<FeedbackIcon />} />

                    <ListItem button key="Usuários" disabled>
                        <ListItemIcon>
                            <PeopleAltIcon />
                        </ListItemIcon>
                        <ListItemText primary="Usuários" />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button key="Configurações" disabled>
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Configurações" />
                    </ListItem>

                </List>
            </Drawer>
        )
    } else {
        return null;
    }
}