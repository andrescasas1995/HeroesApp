import React from 'react';
import { mount } from 'enzyme';
import { HeroScreen } from '../../../components/heroes/HeroScreen';
import { MemoryRouter, Route } from 'react-router-dom';

describe('Pruebas en HeroScreen', () => {
    const history = {
        length: 10,
        push: jest.fn(),
        goBack: jest.fn()
    }

    const wrapper = mount(
        <MemoryRouter initialEntries={['/hero']}>
            <HeroScreen history={history} />
        </MemoryRouter>
    );

    test('Debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });
    
    test('Debe de mostrarse el componente redirect si no hay argumentos en el URL', () => {
        expect(wrapper.find('Redirect').exists()).toBe(true);
    });
    
    test('Debe de mostrar un hero si el parametro existe', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-iron']}>
                <Route exact path="/hero/:heroId" component={HeroScreen} />
            </MemoryRouter>
        );
        
        expect(wrapper.find('.row').exists()).toBe(true);
    });

    test('Debe de regresar a una pantalla por defecto con PUSH', () => {
        const history = {
            length: 1,
            push: jest.fn(),
            goBack: jest.fn()
        }

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-iron']}>
                <Route
                    exact
                    path="/hero/:heroId"
                    component={() => <HeroScreen history={history} />} />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();
        expect(history.push).toHaveBeenCalledTimes(1);
        expect(history.goBack).not.toHaveBeenCalled();
    });

    test('Debe de regresar a la pantalla anterior con GOBACK', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-iron']}>
                <Route
                    exact
                    path="/hero/:heroId"
                    component={() => <HeroScreen history={history} />} />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();
        expect(history.goBack).toHaveBeenCalledTimes(1);
        expect(history.push).not.toHaveBeenCalled();
    });

    test('Debe de llamar redirect si el hero no existe', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-iron12345']}>
                <Route
                    exact
                    path="/hero/:heroId"
                    component={() => <HeroScreen history={history} />} />
            </MemoryRouter>
        );

        expect(wrapper.text()).toBe('');
    });
    
});
