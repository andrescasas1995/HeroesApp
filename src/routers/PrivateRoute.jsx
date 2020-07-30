import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { bool, func} from 'prop-types';

export const PrivateRoute = (props) => {
    const { isAuthenticated, component: Component, ...rest } = props;
    localStorage.setItem('lastPath', rest.location.pathname);
    return (
        <Route
            {...rest}
            component={(compProps) => (
                (isAuthenticated)
                    ? (<Component {...compProps} />)
                    : (<Redirect to="/login" />)
            )}
        />
    )
}

PrivateRoute.propTypes = {
    isAuthenticated: bool.isRequired,
    component: func.isRequired
}