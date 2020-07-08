import React from 'react';
import { mount } from 'enzyme';
import { LoginScreen } from '../../../components/login/LoginScreen';
import { types } from '../../../types/types';
import { AuthContext } from '../../../auth/AuthContext';

describe('Prueba el <LoginScreen />', () => {
  
  const historyMock = {
    replace: jest.fn()
  };

  const contextValue = { dispatch: jest.fn(), user: { logged: false }};
  
  const wrapper = mount(
    <AuthContext.Provider value={ contextValue }>
      <LoginScreen history={ historyMock }/>
    </AuthContext.Provider>
  );

  test('Debe de mostrarse correctamente', () => {
    expect( wrapper ).toMatchSnapshot();
  });
  
  test('Debe de realizar el dispatch y la navegación', () => {
    
    const handleClick = wrapper.find('button').prop('onClick');
    handleClick();

    const dispatched = { type: types.login, payload: { name: 'Gian'}};

    expect( contextValue.dispatch ).toHaveBeenCalledWith( dispatched );
    expect( historyMock.replace ).toHaveBeenCalledTimes( 1 );
    expect( historyMock.replace ).toHaveBeenCalledWith('/');

    localStorage.setItem('lastPath', '/dc');
    handleClick();
    expect( historyMock.replace ).toHaveBeenCalledWith('/dc');
    expect( historyMock.replace ).toHaveBeenCalledTimes( 2 );
  });
});
