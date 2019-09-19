import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import React from 'react'; import { makeStyles } from '@material-ui/core/styles';
import Singnup from '../forms/cadastro';
import ChamadosList from '../components/chamadosList';

export default function Dashboard() {
    return (
        <ChamadosList />
    );
}