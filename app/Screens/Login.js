import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';

import { connect } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage';

import { storeUserData } from '../../actions/loginActions'

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '#2a2a2a',
        paddingLeft: 40,
        paddingRight: 40
    },
    title: {
        fontSize: 40,
        marginTop: 50,
        color: '#fff',
        fontWeight: 'bold'
    },
    formContainer: {
        flex: 1,
        alignItems: 'center',
        width: '80%',
        marginTop: 80
    },
    inputContainerStyle: {
        marginBottom: 20
    },
    inputStyle: {
        color: '#fff',
    },
    textInput: {
        alignSelf: 'stretch',
        padding: 16,
        marginBottom: 20,
        backgroundColor: '#fff'
    },
    button: {
        width: '80%',
        backgroundColor: 'purple',
        marginTop: 50,
        padding: 15,
        alignItems: 'center',
        borderRadius: 15
    },
    btnText: {
        color: '#fff',
        fontSize: 20
    }
})

class Login extends Component {
    
    static navigationOptions = {
        header: null,
    }
    
    constructor(props) {
        super(props)
        this.state = {
            userPhone: '',
            password: '',
            message: '',
            isLoading: true
        }
    }
    
    componentWillMount() {
        this.checkIflogedIn()
    }
    
    checkIflogedIn = async () => {
        let value = await AsyncStorage.getItem('user')
        if (value !== null) {
            this.props.navigation.navigate('Profile')
        }
    }
    
    handleLogin = () => {
            let user = this.state.userPhone
            let pass = this.state.password
        fetch('http://192.168.1.23:3200/signin', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: user,
                pass: pass
            })
        })
        .then(res => res.json())
            .then(async data => {
                if (data.status) {
                    await AsyncStorage.setItem('user', user)
                    await AsyncStorage.setItem('password', pass)
                    this.props.storeUserData(data.user)
                    this.props.navigation.navigate('Profile')
                } else {
                    alert(data.message)
                }
            }).catch(err => console.log(err))
    }
    
    render() {
    return (
        <KeyboardAvoidingView style={styles.wrapper}>
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>
                <View style={styles.formContainer}>
                    <Input
                        onChangeText={userPhone => this.setState({userPhone: userPhone})}
                        placeholder='PHONE NUMBER'
                        inputContainerStyle={styles.inputContainerStyle}
                        placeholderTextColor='#fff'
                        inputStyle={styles.inputStyle}
                        leftIcon={
                            <Icon
                                name='phone'
                                size={24}
                                color='#fff'
                            />
                        }
                        keyboardType='phone-pad'
                        returnKeyType={'next'}
                        onSubmitEditing={() => this.password.focus()}
                    />
                    <Input
                        ref={(input) => this.password = input}
                        onChangeText={password => this.setState({password: password})}
                        placeholder='PASSWORD'
                        inputStyle={styles.inputStyle}
                        placeholderTextColor='#fff'
                        leftIcon={
                            <Icon
                                name='lock'
                                size={24}
                                color='#fff'
                            />
                        }
                        secureTextEntry
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.handleLogin}>
                        <Text style={styles.btnText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
  }
}

const mapStateToProps = state => ({
    phoneNumber: state.tasksReducer.user.phone_number
})

export default connect(mapStateToProps, { storeUserData })(Login)
