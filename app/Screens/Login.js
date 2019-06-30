import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    TouchableOpacity,
    Alert,
    ScrollView
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
        height: '100%',
        backgroundColor: '#000',
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
    },
    signText: {
        fontSize: 15,
        color: '#fff',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: '#fff',
        marginTop: 20,
    },
    scrollViewStyle: {
        width: '100%',
        height: '100%',
    },
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
            this.props.navigation.navigate('Home')
        }
    }
    
    handleLogin = () => {
        let user = this.state.userPhone
        let pass = this.state.password
        if (user === '' || pass === '') {
            Alert.alert(
                'Bad Boy!',
                'You must fill in all fields!',
                [{text: 'OK'}]
            )
            return
        }
    fetch('http://192.168.1.17:3200/signin', {
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
                this.props.navigation.navigate('Home')
            } else {
                alert(data.message)
            }
        }).catch(err => alert(err))
}
    
    render() {
    return (
        <KeyboardAvoidingView style={styles.wrapper}>
            <ScrollView contentContainerStyle={styles.scrollViewStyle}>
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
                        <Text style={styles.signText} onPress={() => this.props.navigation.navigate("Signup")}>Or Sign Up</Text>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
  }
}

const mapStateToProps = state => ({
    phoneNumber: state.tasksReducer.user.phone_number
})

export default connect(mapStateToProps, { storeUserData })(Login)
