import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import { DashboardRouter } from '../../routers/DashboardRoutes';
import { AuthContext } from '../../auth/AuthContext';


describe('Prueba el <DashboardRoutes />', () => {

  const contextValue = { dispatch: jest.fn(), user: { logged: true, name: 'Gian' }};
  
  test('Debe de mostrarse correctamente', () => {
    
    const wrapper = mount(
      <AuthContext.Provider value={ contextValue }>
        <MemoryRouter>
          <DashboardRouter />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    
    expect( wrapper ).toMatchSnapshot();
    expect( wrapper.find('.text-info').text().trim() ).toBe('Gian');
  });
});
