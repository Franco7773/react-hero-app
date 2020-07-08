import React from 'react';
import { mount } from 'enzyme';

import { HeroScreen } from '../../../components/heroes/HeroScreen';
import { MemoryRouter, Route } from 'react-router-dom';

describe('Pruebas en <HeroScreen />', () => {

  const historyMock = {
    length: 11,
    push: jest.fn(),
    goBack: jest.fn()
  };
  
  test('Debe de mostrar el componente redirect si no hay argumentos en el URL', () => {

    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero']}>
        <HeroScreen history={ historyMock } />
      </MemoryRouter>
    );

    expect( wrapper.find('Redirect').exists()).toBe( true );
  });

  test('Debe de mostrar un hero si el parámetro existe y se encuentra', () => {
    
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-spider']}>
        <Route path="/hero/:heroId" component={ HeroScreen } />
      </MemoryRouter>
    );

    expect( wrapper.find('.row').exists()).toBe( true );
  });

  test('Debe de regresar a la pantalla anterior con PUSH', () => {

    const historyMock = {
      length: 1,
      push: jest.fn(),
      goBack: jest.fn()
    };

    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-spider']}>
        <Route path="/hero/:heroId" component={ () => <HeroScreen history={ historyMock }/> } />
      </MemoryRouter>
    );

    wrapper.find('button').prop('onClick')();
    
    expect( historyMock.push ).toHaveBeenCalledWith('/');
    expect( historyMock.goBack ).not.toHaveBeenCalled();
  });
  
  test('Debe de regresar a la pantalla anterior', () => {

    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-spider']}>
        <Route path="/hero/:heroId" component={ () => <HeroScreen history={ historyMock }/> } />
      </MemoryRouter>
    );

    wrapper.find('button').prop('onClick')();
    
    expect( historyMock.goBack ).toHaveBeenCalled();
    expect( historyMock.push ).toHaveBeenCalledTimes( 0 );
  });
  
  test('Debe de llamar al redirect si el hero no existe', () => {
    
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-spiderman']}>
        <Route path="/hero/:heroId" component={ () => <HeroScreen history={ historyMock }/> } />
      </MemoryRouter>
    );

    expect( wrapper.text()).toBe('');
  });
});
