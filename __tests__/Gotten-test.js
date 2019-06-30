import 'react-native';
import React from 'react';
import Gotten from '../app/Screens/Gotten'
import renderer from 'react-test-renderer';

describe('Gotten functionality', () => {
  test('Gotten component renders correctly', () => {
    const snapshot = renderer.create(<Gotten/>).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
})