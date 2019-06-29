// import React, { Component } from 'react'
// import { StyleSheet, Text, View } from 'react-native'
import { createSwitchNavigator, createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation'
// import Icon from 'react-native-vector-icons/Ionicons'

import Login from './app/Screens/Login'
import Profile from './app/Screens/Profile'
import Given from './app/Screens/Given'
import Gotten from './app/Screens/Gotten'
import GiveTask from './app/Screens/GiveTask'
import Task from './app/Screens/Task'

const MainNavigator = createBottomTabNavigator({
  Profile: {screen: Profile},
  Given: {screen: Given},
  Gotten: {screen: Gotten},
},
  {
    initialRouteName: 'Profile'
  }
)

const LoginNavigator = createStackNavigator({
  Login: { screen: Login }
});


export default App = createAppContainer(createSwitchNavigator(
  {
    Auth: LoginNavigator,
    App: MainNavigator,
    GiveTask,
    Task
  },
  {
    initialRouteName: 'Auth',
  }
))

