import 'react-native';
import React from 'react';
import Profile from '../app/Screens/Profile'
import renderer from 'react-test-renderer';

describe('Profile functionality', () => {
  test('Profile component renders correctly', () => {
    const snapshot = renderer.create(<Profile/>).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
})