import React, { Component } from 'react'
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import { ListItem } from 'react-native-elements'

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
        marginTop: 15,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    box: {
        width: '100%',
        height: 100,
        backgroundColor: '#666',
        marginTop: 10,
    },
    text: {
        fontSize: 16,
        color: '#fff'
    },
    button: {
        width: '60%',
        // backgroundColor: '#7b1fa2',
        marginTop: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 15,
        alignItems: 'center',
        borderRadius: 15
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
                    size={80}
                    color='#7b1fa2'
                />
                <Text style={styles.nameText}>Hello {this.props.user.name}</Text>
            </View>
            <ListItem
                style={styles.box}
                containerStyle={{width: '100%', height: 100, backgroundColor: '#2a2a2a', borderRadius: 0}}
                leftIcon={<Icon
                            name='tasks'
                            size={40}
                            color='#7b1fa2'
                          />}
                title={<Text style={styles.text}>No. Of Task You Have Gave: {this.props.user.given_tasks.length}
                </Text>}
                subtitleStyle={{color: 'black'}}
            />
            <ListItem
                style={styles.box}
                containerStyle={{width: '100%', height: 100, backgroundColor: '#2a2a2a', borderRadius: 0}}
                leftIcon={<Icon
                            name='tasks'
                            size={40}
                            color='#7b1fa2'
                          />}
                title={<Text style={styles.text}>No. Of Task You Have Got: {this.props.user.gotten_tasks.length}
                </Text>}
                subtitleStyle={{color: 'black'}}
            />
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
