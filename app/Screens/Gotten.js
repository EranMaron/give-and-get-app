import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, ProgressBarAndroid } from 'react-native'
import { connect } from 'react-redux'
import { ListItem } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

import { URI } from '../../consts'
import { storeUserData } from '../../actions/loginActions'

import Card from '../components/Card'
import AsyncStorage from '@react-native-community/async-storage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: '#000'
  },
  scrollViewStyle: {
    width: '100%'
  },
  title: {
    fontSize: 25,
    paddingTop: 20,
    color: '#7b1fa2',
    marginBottom: 30
  },
  card: {
    width: '95%',
    marginBottom: 2,
  },
  taskTitle: {
    fontSize: 18,
    color: '#fff',
    marginTop: 40,
    fontWeight: 'bold',
  },
  listItem: {
    width: '95%',
    borderRadius: 15
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  progressBar: {
      width: '60%'
  },
  loaderText: {
    fontSize: 25,
    color: '#fff',
  },
  messageContainer: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    color: '#fff',
    fontSize: 25,
    textAlign: 'center'
  },
})

class Given extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true
    }
  }
  
  static navigationOptions = {
    tabBarOptions: {
      inactiveBackgroundColor: '#000',
      activeBackgroundColor: "#000",
      activeTintColor: "purple",
      labelStyle: {
        fontSize: 15,
        paddingBottom: 10,
      },
    },
  }
  
  componentDidMount() {
    this.navListener = this.props.navigation.addListener('didFocus', async () => {
      let user = await AsyncStorage.getItem('user')
      let pass = await AsyncStorage.getItem('password')
      fetch(`${URI}/signin`, {
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
                  this.props.storeUserData(data.user)
                  this.setState({isLoading: false})
                } else {
                    alert(data.message)
                }
            }).catch(err => alert(err))
    })
  }
  
  showTasks = (task, i) => {
    return  <TouchableOpacity
                style={styles.card}
                key={i}
                onPress={() => this.handleTaskPress(task)}
              >
              <ListItem
                style={styles.listItem}
                containerStyle={{width: '100%', height: 100, backgroundColor: '#2a2a2a', borderRadius: 0}}
                leftIcon={<Icon
                            name='tasks'
                            size={40}
                            color='#7b1fa2'
                          />}
                title={<Text style={styles.taskTitle} numberOfLines={1}>{task.task_name}</Text>}
                subtitle={<Card task={task} />}
                titleStyle={{fontSize: 24, color: '#fff', fontWeight: 'bold', marginTop: 60}}
                subtitleStyle={{color: 'black'}}
              />
            </TouchableOpacity>
  }
  
  handleTaskPress = (task) => {
    this.props.navigation.navigate("Task", {task, page: 'Gotten'})
  }
  
  render() {
    if (this.state.isLoading)
      return  <View style={styles.loaderContainer}>
                <ProgressBarAndroid
                  style={styles.progressBar}
                  styleAttr="Horizontal"
                  indeterminate={true} />
                <Text style={styles.loaderText}>Loading...</Text>
              </View>
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Gotten Tasks</Text>
        <ScrollView contentContainerStyle={styles.scrollViewStyle}>
          {this.props.gottenTasks.length === 0 ?
            <View style={styles.messageContainer}>
              <Text style={styles.message}>Lucky One!</Text>
              <Text style={styles.message}>No one want you to do nothing</Text>
            </View> :
            this.props.gottenTasks.map(this.showTasks)
          }
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  gottenTasks: state.tasksReducer.user.gotten_tasks,
})

export default connect(mapStateToProps,{ storeUserData })(Given)
