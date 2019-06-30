import React, { Component } from 'react'
import { Text, View, StyleSheet, ProgressBarAndroid } from 'react-native'
import { connect } from 'react-redux'

import moment from 'moment';
var now = moment().format();

const styles = StyleSheet.create({
    cardContainer: {
        width: '100%',
        height: '100%',
    },
    text: {
        fontSize: 18,
        color: '#fff'
    },
    progressBarContainer: {
        width: '100%',  
    },
    progressBar: {
        width: '80%'  
    },
})

class Card extends Component {
    
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <View style={styles.cardContainer}>
                <Text style={styles.text} numberOfLines = { 1 }> {this.props.task.description} </Text>
                <Text style={styles.text} numberOfLines = { 1 }> {this.props.task.reward} </Text>
                <View style={styles.progressBarContainer}>
                    <ProgressBarAndroid
                        style={styles.progressBar}
                        styleAttr="Horizontal"
                        indeterminate={false}
                        progress={0.5}
                    />
                </View>
            </View>
        )
  }
}

const mapStateToProps = state => ({
    taskName: state.tasksReducer.user.task_name,
    taskDescription: state.tasksReducer.user.description,
    taskReward: state.tasksReducer.user.reward,
    givenTask: state.tasksReducer.user.given_tasks,
    createTaskDate: state.tasksReducer.user.given_tasks.createTaskDate,
    expiredDate: state.tasksReducer.user.given_tasks.expired_date
})

export default connect(mapStateToProps, {})(Card)
