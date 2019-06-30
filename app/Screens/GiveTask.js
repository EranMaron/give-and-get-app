import React, { Component } from 'react'
import { Text, View, Alert, StyleSheet, KeyboardAvoidingView, TouchableOpacity, ScrollView } from 'react-native'
import { Calendar } from 'react-native-calendars'
import LinearGradient from 'react-native-linear-gradient'

import Icon from 'react-native-vector-icons/FontAwesome5';
import { Input } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#000'
    },
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    title: {
        fontSize: 40,
        marginTop: 50,
        color: '#fff',
        fontWeight: 'bold'
    },
    scrollViewStyle: {
        width: '100%',
    },
    formContainer: {
        flex: 1,
        alignItems: 'center',
        width: '80%',
        marginTop: 50
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
        marginTop: 10,
        padding: 15,
        marginBottom: 100,
        alignItems: 'center',
        borderRadius: 15
    },
    expiredContainer: {
        width: '95%',
        height: 45,
        flexDirection: 'row',  
        marginBottom: 20,
        borderBottomWidth: 2,
        borderStyle: 'solid',
        borderColor: '#666'
    },
    expiredIcon: {
        paddingLeft: 20,
    },
    expiredBtn: {
        width: '50%',
        marginBottom: 20,
        padding: 8,
        alignItems: 'center',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#fff',
        borderRadius: 15
    },
    expiredText: {
        color: '#fff',
        fontSize: 18,
        paddingLeft: 5
    },
    calendar: {
        width: '100%',
    },  
    btnText: {
        color: '#fff',
        fontSize: 18
    },
    backBtn: {
        width: 50,
        height: 70,
        backgroundColor: 'transparent'  
    },
    backIcon: {
        width: '100%',
        backgroundColor: 'transparent',
        margin: 20,
    },
})

class GiveTask extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            recieverPhoneNumber: '',
            taskName: '',
            taskDescription: '',
            reward: '',
            expiredDate: 'YYYY-MM-DD',
            createTaskDate: '',
            showExpiredBtn: true
        }
    }
    
    handleSend = async () => {
        if (this.state.recieverPhoneNumber === '' || this.state.taskName === '' || this.state.taskDescription === '' || this.state.reward === '') {
            Alert.alert(
                'Bad Boy!',
                'You must fill in all fields!',
                [{text: 'OK'}]
            )
            return
        }
        let userPhoneNumber = await AsyncStorage.getItem('user')
        console.log(userPhoneNumber)
        fetch('http://192.168.1.17:3200/addTask', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userSendPhoneNumber: userPhoneNumber,
                recieverPhoneNumber: this.state.recieverPhoneNumber,
                task_name: this.state.taskName,
                description: this.state.taskDescription,
                reward: this.state.reward,
                expired_date: this.state.expiredDate,
                createTaskDate: this.state.createTaskDate
            })
        })
            .then(res => res.json())
            .then((data) => {
                    if (data.status === '400') {
                        Alert.alert(
                            'Error!',
                            data.message,
                            [{text: 'Close'}]
                        )
                    } else {
                        this.props.navigation.navigate("Given", {date: new Date()})  
                    }
                }
        )
            .catch(err => console.log(err))
    }
    
    handleExpiredBtn = () => {
        this.setState({showExpiredBtn: false})
    }
    
    render() {
    return (
        <KeyboardAvoidingView style={styles.wrapper}>
            <TouchableOpacity
                style={styles.backBtn}
                onPress={() => this.props.navigation.navigate("Home")}
            >
                <Icon
                    style={styles.backIcon}
                    name='arrow-left'
                    size={30}
                    color='#fff'
                />
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.scrollViewStyle}>
                <View style={styles.container}>
                    <Text style={styles.title}>Add Task</Text>
                    <View style={styles.formContainer}>
                    <Input
                        onChangeText={userPhone => this.setState({recieverPhoneNumber: userPhone})}
                        placeholder='Phone Number'
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
                            onChangeText={taskName => this.setState({taskName: taskName})}
                            placeholder='Task Name'
                            inputContainerStyle={styles.inputContainerStyle}
                            placeholderTextColor='#fff'
                            inputStyle={styles.inputStyle}
                            leftIcon={
                                <Icon
                                    name='tasks'
                                    size={24}
                                    color='#fff'
                                />
                            }
                            returnKeyType={'next'}
                            onSubmitEditing={() => this.description.focus()}
                        />
                        <Input
                            ref={(input) => this.description = input}
                            onChangeText={description => this.setState({taskDescription: description})}
                            returnKeyType={'next'}
                            onSubmitEditing={() => this.expired.focus()}                       
                            placeholder='Description'
                            inputContainerStyle={styles.inputContainerStyle}                        
                            inputStyle={styles.inputStyle}
                            placeholderTextColor='#fff'
                            leftIcon={
                                <Icon
                                    name='edit'
                                    size={24}
                                    color='#fff'
                                />
                            }
                        />
                        <Input
                            ref={(input) => this.reward = input}
                            onChangeText={reward => this.setState({reward: reward})}
                            placeholder='Reward'
                            inputContainerStyle={styles.inputContainerStyle}                        
                            inputStyle={styles.inputStyle}
                            placeholderTextColor='#fff'
                            leftIcon={
                                <Icon
                                    name='gift'
                                    size={24}
                                    color='#fff'
                                />
                            }
                        />
                        <View style={styles.expiredContainer}>
                            <Icon
                                style={styles.expiredIcon}
                                name='calendar'
                                size={20}
                                color='#fff'
                            />    
                            <Text style={styles.expiredText}>{this.state.expiredDate}</Text>
                        </View>
                        {this.state.showExpiredBtn ?
                            (<TouchableOpacity
                            style={styles.expiredBtn}
                            onPress={this.handleExpiredBtn}>
                            <Text style={styles.btnText}>Pick Expired Date</Text>
                            </TouchableOpacity>) :
                            <Calendar
                                style={styles.calendar}
                                minDate={new Date()}
                                onDayPress={(dateString) => {
                                    let time = new Date()
                                    let date = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`
                                    this.setState({
                                        expiredDate: dateString.dateString,
                                        createTaskDate: date,
                                        showExpiredBtn: true
                                    })
                                }}
                            />
                        }
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.handleSend}>
                            <Text style={styles.btnText}>Send</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>    
        </KeyboardAvoidingView>
    )
  }
}

export default GiveTask
