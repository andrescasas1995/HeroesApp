import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { bool, func} from 'prop-types';

export const PublicRoute = (props) => {
    const { isAuthenticated, component: Component, ...rest } = props;
    return (
        <Route
            {...rest}
            component={(compProps) => (
                (!isAuthenticated)
                    ? (<Component {...compProps} />)
                    : (<Redirect to="/" />)
            )}
        />
    )
}

PublicRoute.propTypes = {
    isAuthenticated: bool.isRequired,
    component: func.isRequired
}