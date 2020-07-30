import React, { useContext } from 'react'
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';

export const LoginScreen = (props) => {
    const { dispatch } = useContext(AuthContext);

    const handleLogin = () => {
        const { history } = props;
        const lastPath = localStorage.getItem('lastPath') || '/';
        
        dispatch({
            type: types.login,
            payload: {
                name: 'Andres'
            }
        });
        history.replace(lastPath);
    }

    return (
        <div className="container mt-5">
            <h1>Login</h1>
            <hr />

            <button
                className="btn btn-outline-primary"
                onClick={handleLogin}
            >
                Login
            </button>
        </div>
    )
}
