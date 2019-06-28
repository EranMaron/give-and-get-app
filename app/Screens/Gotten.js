import React, { Component } from 'react'
import { Text, View } from 'react-native'

class Gotten extends Component {
    
    static navigationOptions = {
        title: 'Gets',
        headerStyle: {
        backgroundColor: 'purple',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarOptions: {
          inactiveBackgroundColor: '#2a2a2a',  
          activeBackgroundColor: "purple",
          activeTintColor: "#fff",
          labelStyle: {
            fontSize: 15,
            paddingBottom: 10,
          },
        }
    }
    
  render() {
    return (
      <View>
        <Text> Gotten Screen </Text>
      </View>
    )
  }
}

export default Gotten
