import 'react-native';
import React from 'react';
import Given from '../app/Screens/Given'
import renderer from 'react-test-renderer'

describe('Given functionality', () => {
  test('Given component renders correctly', () => {
    const snapshot = renderer.create(<Given/>).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
})