import 'react-native';
import React from 'react';
import Login from '../app/Screens/Login'
import renderer from 'react-test-renderer';

describe('Login functionality', () => {
  test('Login component renders correctly', () => {
    const snapshot = renderer.create(<Login/>).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
})