import React from 'react';
import { mount } from 'enzyme';
import { LoginScreen } from '../../../components/login/LoginScreen';
import { AuthContext } from '../../../auth/AuthContext';
import { types } from '../../../types/types';

describe('Pruebas en LoginScreen', () => {
    
    const history = {
        replace: jest.fn()
    }

    const contextMock = {
        dispatch: jest.fn()
    }

    const wrapper = mount(
        <AuthContext.Provider value={contextMock}>
            <LoginScreen history={history} />
        </AuthContext.Provider>
    );

    test('Debe de mostrarse correctamete', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Debe de realizar el dispatch y la navegación', () => {
        const handleClick = wrapper.find('button').prop('onClick');
        handleClick();
        expect(contextMock.dispatch).toHaveBeenCalledTimes(1);
        expect(contextMock.dispatch).toHaveBeenCalledWith({
            payload: {name: "Andres"},
            type: types.login
        });
        expect(history.replace).toHaveBeenCalledTimes(1);
        expect(history.replace).toHaveBeenCalledWith("/");

        localStorage.setItem('lastPath', '/dc');
        handleClick();
        expect(history.replace).toHaveBeenCalledWith("/dc");
    });
});
