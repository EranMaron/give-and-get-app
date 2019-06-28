import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
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
    backgroundColor: '#2a2a2a'
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
  listItem: {
    width: '95%',
    borderRadius: 15
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
    headerStyle: {
      backgroundColor: 'purple',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    tabBarOptions: {
      inactiveBackgroundColor: '#2a2a2a',
      activeBackgroundColor: "#5E1284",
      activeTintColor: "#fff",
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
      fetch('http://192.168.15.1:3200/signin', {
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
                title={task.task_name}
                subtitle={<Card task={task} />}
                titleStyle={{fontSize: 24, color: '#fff', fontWeight: 'bold', marginTop: 60}}
                subtitleStyle={{color: 'black'}}
              />
            </TouchableOpacity>
  }
  
  handleTaskPress = (taskName) => {
    //TODO: Navigate to Task page
    console.log('Task Name: ', taskName)
  }
  
  render() {
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
