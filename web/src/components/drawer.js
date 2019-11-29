import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import FeedbackIcon from '@material-ui/icons/Feedback';
import PeopleIconOutlined from '@material-ui/icons/PeopleOutlined';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import MapIcon from '@material-ui/icons/Map';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import React from 'react';
import { useAuth } from "../customHooks/useAuth";
import { useHistory } from "react-router-dom";
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
    let history = useHistory();
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
                    <ListItemLink to="/Avisos" primary="Avisos" icon={<FeedbackIcon />} />
                    {/* <ListItemLink to="/Chamados" primary="Chamados" icon={<SubjectIcon />} /> */}
                    <ListItemLink to="/Agentes" primary="Agentes" icon={<PeopleIconOutlined />} />
                    <ListItemLink to="/Alertas" primary="Alertas" icon={<AddAlertIcon />} />
                    {/* <ListItemLink to="/Configurações" primary="Configurações" icon={<SettingsIcon />} /> */}
                </List>
                <Divider />
                <List>
                    <ListItemLink to="/Sair" primary="Sair"
                        icon={<ExitToAppIcon />}
                        onClick={() => {
                            auth.signout()
                            history.push('/')
                        }} />
                </List>
            </Drawer>
        )
    } else {
        return null;
    }
}