import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';
import { SearchScreen } from '../../../components/search/SearchScreen';

describe('Pruebas en el componente SearchScreen', () => {
    test('Debe de mostrarse correctamente con valores por defecto', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <Route path="/search" component={SearchScreen} />
            </MemoryRouter>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.alert-info').text().trim()).toBe('Search a hero');
    });
    
    test('Debe de mostrar a Batman y el el query con el string', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <Route path="/search" component={SearchScreen} />
            </MemoryRouter>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('input').prop('value')).toBe('batman');
    });
    
    test('Debe de mostrar un error si no se encuentra el hero', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batmant']}>
                <Route path="/search" component={SearchScreen} />
            </MemoryRouter>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.alert-warning').text().trim()).toBe('There is not a hero with " batmant "');
    });
    
    test('Debe de llamar el push del history', () => {
        const history = {
            push: jest.fn()
        };

        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batmant']}>
                <Route
                path="/search"
                component={() => <SearchScreen history={history} />}
            />
            </MemoryRouter>
        );

        wrapper.find('input').simulate('change', {
            target: {
                name: 'search',
                value: 'thor'
            }
        });

        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        });

        expect(history.push).toHaveBeenCalledWith(`?q=thor`);
    });
});
