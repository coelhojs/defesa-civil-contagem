import "firebase/auth";
import React from 'react';
import { Route } from "react-router-dom";
import { useAuth } from "../customHooks/useAuth";
import { useHistory } from "react-router-dom";

export default function PrivateRoute({ children, ...rest }) {
    const auth = useAuth();
    let history = useHistory();

    if (auth.usuario && auth.apiKey) {
        return (
            <Route {...rest} render={() => children} />
        )
    } else {
        auth.signout();
        history.push('/defesa-civil-contagem/')
        // auth.toggleShowWarning();
        return null
    };
}