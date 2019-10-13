
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import React, { Component } from 'react'

import { Link as RouterLink } from 'react-router-dom';

export default function ListItemLink(props) {
    const { icon, primary, to } = props;

    const renderLink = React.useMemo(
        () =>
            React.forwardRef((itemProps, ref) => (
                // with react-router-dom@^5.0.0 use `ref` instead of `innerRef`
                <RouterLink to={to} {...itemProps} innerRef={ref} />
            )),
        [to],
    );

    return (
        <li>
            <ListItem button component={renderLink}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={primary} />
            </ListItem>
        </li>
    );
}

ListItemLink.propTypes = {
    icon: PropTypes.node.isRequired,
    primary: PropTypes.node.isRequired,
    to: PropTypes.string.isRequired,
};

// polyfill required for react-router-dom < 5.0.0
const Link = React.forwardRef((props, ref) => <RouterLink {...props} innerRef={ref} />);

function ListItemLinkShorthand(props) {
    const { primary, to } = props;
    return (
        <li>
            <ListItem button component={Link} to={to}>
                <ListItemText primary={primary} />
            </ListItem>
        </li>
    );
}

ListItemLinkShorthand.propTypes = {
    primary: PropTypes.node.isRequired,
    to: PropTypes.string.isRequired,
};
