import 'react-native';
import React from 'react';
import GiveTask from '../app/Screens/giveTask'
import renderer from 'react-test-renderer';

describe('GiveTask functionality', () => {
  test('GiveTask component renders correctly', () => {
    const snapshot = renderer.create(<GiveTask/>).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
})