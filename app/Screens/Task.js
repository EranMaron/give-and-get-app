import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Divider } from 'react-native-elements'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#000',
    },
    scrollViewStyle: {
        width: '100%',
    },
    titleContainer: {
        alignItems: 'center',
        width: '100%',
        borderBottomWidth: 2,
        borderColor: '#fff',
        marginBottom: 20,
    },
    taskName: {
        fontSize: 40,
        color: '#fff',
        marginBottom: 15,
        marginLeft: 15,
    },
    taskContainer: {
        width: '100%', 
    },
    text: {
        fontSize: 18,
        color: '#fff',
        marginTop: 0,
        marginBottom: 10,
        marginLeft: 15,
    },
    btnContainer: {
        alignItems: 'center',
        marginTop: 40,  
        marginBottom: 50,  
    },
    button: {
        width: '60%',
        backgroundColor: 'purple',
        padding: 15,
        alignItems: 'center',
        borderRadius: 15
    },
    btnText: {
        color: '#fff',
        fontSize: 20
    },
    img: {
        width: 150,
        height: 130,
        marginTop: 25,
        marginBottom: 15,
    },
    title: {
        fontSize: 25,
        color: '#fff',
        marginTop: 5,
        marginBottom: 10,
        marginLeft: 15,
    },
    divider: {
        backgroundColor: '#fff'  
    },
})

export default class Task extends Component {
    render() {
        let task = this.props.navigation.getParam('task')
        console.log(task)
        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollViewStyle}>
                    <View style={styles.titleContainer}>
                        <Image style={styles.img} source={require('../../assets/give_task.png')}/>
                        <Text style={styles.taskName}>{task.task_name}</Text>
                    </View>
                    <View style={styles.taskContainer}>
                        <Text style={styles.title}>Task Description:</Text>
                        <Text style={styles.text}>{task.description}</Text>
                        <Divider style={styles.divider} />
                        <Text style={styles.title}>Date Of Creation:</Text>
                        <Text style={styles.text}>{task.createTaskDate}</Text>
                        <Divider style={styles.divider} />
                        <Text style={styles.title}>Date Of Expired:</Text>
                        <Text style={styles.text}>{task.expired_date}</Text>
                        <Divider style={styles.divider} />
                        <Text style={styles.title}>Reward:</Text>
                        <Text style={styles.text}>{task.reward}</Text>
                        <Divider style={styles.divider} />
                    </View>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.props.navigation.navigate("Given", {date: new Date()})}>
                            <Text style={styles.btnText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
    )
  }
}
