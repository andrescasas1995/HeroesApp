const { authReducer } = require("../../auth/authReducer");
const { types } = require("../../types/types");

describe('Pruebas en authReducer', () => {
    test('Debe de retornar el estado por defecto', () => {
        const stateReducer = authReducer({}, {});
        expect(stateReducer).toEqual({});
    });

    test('Debe de autenticar y colocar el name del usuario', () => {
        const state = {
            name: 'Andres'
        }
        const stateReducer = authReducer({}, { type: types.login, payload: state });
        expect(stateReducer).toEqual({...state, logged: true});
    });

    test('Debe de borrar el name del usuario y logged en false', () => {
        const state = {
            name: 'Andres'
        }
        const stateReducer = authReducer({}, { type: types.logout });
        expect(stateReducer).toEqual({logged: false});
    });
});
