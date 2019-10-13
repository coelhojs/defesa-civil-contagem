import React from 'react';
import { Route, useHistory } from "react-router-dom";
import { useAuth } from '../customHooks/useAuth';

export default function Cadastro({ children, ...rest }) {
    const auth = useAuth();
    const history = useHistory();

    if (auth.user) {
        return (
            <Route {...rest} render={() => children} />
        )
    } else {
        auth.toggleShowWarning();
        history.push('/');
        return null
    };
};