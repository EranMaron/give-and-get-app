import 'react-native';
import React from 'react';
import Card from '../app/components/Card'
import renderer from 'react-test-renderer';

describe('Card functionality', () => {
  test('Card component renders correctly', () => {
    const snapshot = renderer.create(<Card/>).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
})

