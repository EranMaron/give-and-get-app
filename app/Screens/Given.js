import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, ProgressBarAndroid } from 'react-native'
import { connect } from 'react-redux'
import { ListItem } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

// import LinearGradient from 'react-native-linear-gradient'
import { storeUserData } from '../../actions/loginActions'

import Card from '../components/Card'
import AsyncStorage from '@react-native-community/async-storage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#000'
  },
  scrollViewStyle: {
    // flex: 1,
    // alignItems: 'center',
    width: '100%'
  },
  title: {
    fontSize: 30,
    paddingTop: 15,
    color: '#fff',
    marginBottom: 30
  },
  card: {
    width: '95%',
    marginBottom: 15,
  },
  taskTitle: {
    fontSize: 25,
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
})

class Given extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true
    }
  }
  
  static navigationOptions = {
    title: 'Gives',
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
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
  
  componentWillMount() {
    this.navListener = this.props.navigation.addListener('didFocus', async () => {
      let user = await AsyncStorage.getItem('user')
      let pass = await AsyncStorage.getItem('password')
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
                  this.props.storeUserData(data.user)
                  this.setState({isLoading: false})
                } else {
                    alert(data.message)
                }
            }).catch(err => console.log(err))
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
                containerStyle={{width: '100%', height: 100, backgroundColor: 'purple', borderRadius: 15}}
                leftIcon={<Icon
                            name='tasks'
                            size={60}
                            color='#fff'
                          />}
                title={<Text style={styles.taskTitle} numberOfLines={1}>{task.task_name}</Text>}
                subtitle={<Card task={task} />}
                titleStyle={{fontSize: 24, color: '#fff', fontWeight: 'bold', marginTop: 60}}
                subtitleStyle={{color: 'black'}}
              />
            </TouchableOpacity>
  }
  
  handleTaskPress = (task) => {
    //TODO: Navigate to Task page
    console.log('Task Name: ', task)
    this.props.navigation.navigate("Task", {task})
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
        <Text style={styles.title}>Given Tasks</Text>
        <ScrollView contentContainerStyle={styles.scrollViewStyle}>
          {this.props.givenTasks.map(this.showTasks)}
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  givenTasks: state.tasksReducer.user.given_tasks,
})

export default connect(mapStateToProps,{ storeUserData })(Given)
