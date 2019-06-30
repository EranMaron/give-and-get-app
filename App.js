// import React, { Component } from 'react'
// import { StyleSheet, Text, View } from 'react-native'
import { createSwitchNavigator, createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation'
// import Icon from 'react-native-vector-icons/Ionicons'

import Login from './app/Screens/Login'
import Signup from './app/Screens/Signup'
import Home from './app/Screens/Home'
import Given from './app/Screens/Given'
import Gotten from './app/Screens/Gotten'
import GiveTask from './app/Screens/GiveTask'
import Task from './app/Screens/Task'
import Profile from './app/Screens/Profile'

const MainNavigator = createBottomTabNavigator({
  Home: {screen: Home,},
  Given: {screen: Given},
  Gotten: {screen: Gotten},
  Profile: {screen: Profile},
},
  {
    initialRouteName: 'Home'
  }
)

const LoginNavigator = createStackNavigator({
  Login: {screen: Login},
  Signup: {screen: Signup}
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

