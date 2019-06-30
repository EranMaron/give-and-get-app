import React, { Component } from 'react'
import {Text, View, StyleSheet} from 'react-native'
import { connect } from 'react-redux'

import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    iconContainer: {
        alignItems: 'center',
        marginTop: 50,
    },
})

class Profile extends Component {
    
    static navigationOptions = {
        tabBarOptions: {
          activeBackgroundColor: "#000",
          activeTintColor: "purple",      
          inactiveBackgroundColor: '#000',
          showIcon: true,
          labelStyle: {
            fontSize: 15,
            paddingBottom: 10,
          },
        }
    }
    
  render() {
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Icon
                    style={styles.icon}
                    name='user-circle-o'
                    size={120}
                    color='purple'
                />
            </View>
        <Text >Hello {this.props.user.name}</Text>
      </View>
    )
  }
}

const mapStateToProps = state => ({
    user: state.tasksReducer.user
  })

export default connect(mapStateToProps)(Profile)
