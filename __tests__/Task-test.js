import 'react-native';
import React from 'react';
import Task from '../app/Screens/Task'
import renderer from 'react-test-renderer';

describe('Task functionality', () => {
  test('Task component renders correctly', () => {
    const snapshot = renderer.create(<Task/>).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
})