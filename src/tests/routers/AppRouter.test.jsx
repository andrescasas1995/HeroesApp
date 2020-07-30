import React from 'react';
import { mount } from 'enzyme';
import { AppRouter } from '../../routers/AppRouter';
import { AuthContext } from '../../auth/AuthContext';
import { MarvelScreen } from '../../components/marvel/MarvelScreen';

describe('Pruebas en AppRouter', () => {
    
    test('Debe de mostrar el login si no está autenticado', () => {
        const contextValue = {
            dispatch: jest.fn(),
            user: {
                logged: false
            }
        }

        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter
                    isAuthenticated={false}
                    component={() => <span>Ready</span>}
                />
            </AuthContext.Provider>
        );

        expect(wrapper.find('LoginScreen').exists()).toBe(true);
    });
    
    test('Debe de mostrar el componente marvel si está autenticado', () => {
        const contextValue = {
            dispatch: jest.fn(),
            user: {
                name: 'Andres',
                logged: true
            }
        }
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter
                    isAuthenticated={true}
                    component={() => <MarvelScreen />}
                />
            </AuthContext.Provider>
        );

        expect(wrapper.find('MarvelScreen').exists()).toBe(true);
    });
});
