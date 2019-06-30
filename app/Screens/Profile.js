import React, { Component } from 'react'
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage';

import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    iconContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#666',
        
    },
    nameText: {
        fontSize: 25,
        color: '#fff',
        marginTop: 20,
        marginBottom: 10,
        
    },
    box: {
        width: '100%',
        height: 100,
        backgroundColor: '#666',
        marginTop: 10,
    },
    text: {
        fontSize: 20,
        color: '#fff'
    },
    button: {
        width: '80%',
        backgroundColor: 'purple',
        marginTop: 50,
        marginRight: 'auto',
        marginLeft: 'auto',
        padding: 15,
        alignItems: 'center',
    },
    btnText: {
        color: '#fff',
        fontSize: 20
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
    
    handleLogOut = async () => {
        let user = await AsyncStorage.removeItem('user')
        let password = await AsyncStorage.removeItem('password')
        this.props.navigation.navigate("Login")
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
                <Text style={styles.nameText}>Hello {this.props.user.name}</Text>
            </View>
            <View>
                <View style={styles.box}>
                    <Text style={styles.text}>No. Of Task You Have Gave:               {this.props.user.given_tasks.length}
                    </Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.text}> No. Of Task You Have Got:    {this.props.user.gotten_tasks.length}
                    </Text>
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={this.handleLogOut}>
                <Text style={styles.btnText}>Log Out</Text>
            </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = state => ({
    user: state.tasksReducer.user
  })

export default connect(mapStateToProps)(Profile)
