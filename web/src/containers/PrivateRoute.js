import "firebase/auth";
import React from 'react';
import { Route } from "react-router-dom";
import { useAuth } from "../customHooks/useAuth";

export default function PrivateRoute({ children, ...rest }) {
    const auth = useAuth();

    if (auth.usuario && auth.apiKey) {
        return (
            <Route {...rest} render={() => children} />
        )
    } else {
        auth.signout();
        auth.toggleShowWarning();
        return null
    };
}