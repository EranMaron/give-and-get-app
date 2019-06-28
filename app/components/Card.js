import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient';

const styles = StyleSheet.create({
    cardContainer: {
        // alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    text: {
        fontSize: 18,
        color: '#fff'
    }
})

class Card extends Component {
    
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <View style={styles.cardContainer}>
                {/* <LinearGradient style={styles.card} colors={['#170020', '#5E0084']}> */}
                <View />
                {/* <Text style={styles.text}> {this.props.task.task_name} </Text> */}
                <Text style={styles.text}> {this.props.task.description} </Text>
                <Text style={styles.text}> {this.props.task.reward} </Text>
                {/* </LinearGradient> */}
            </View>
        )
  }
}

const mapStateToProps = state => ({
    taskName: state.tasksReducer.user.task_name,
    taskDescription: state.tasksReducer.user.description,
    taskReward: state.tasksReducer.user.reward,
    givenTask: state.tasksReducer.user.given_tasks
})

export default connect(mapStateToProps, {})(Card)
