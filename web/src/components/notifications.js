import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { useAuth } from "../customHooks/useAuth";
import NotificationsIcon from '@material-ui/icons/Notifications';

const useStyles = makeStyles(theme => ({
    margin: {
        marginRight: theme.spacing(3),
    },
}));

export default function Notifications(props) {
    const classes = useStyles();
    const auth = useAuth();

    if (auth.user) {
        return (
            <Badge className={classes.margin} badgeContent={4} color="primary">
                <NotificationsIcon />
            </Badge>
        )
    } else {
        return null
    }
};