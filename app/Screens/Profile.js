import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'

import { connect } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage';


import { storeUserData } from '../../actions/loginActions'
import LinearGradient from 'react-native-linear-gradient';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000'
  },
  title: {
    fontSize: 40,
    marginTop: 50,
    color: '#fff',
    fontWeight: 'bold'
  },
  BtnsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  giveBtnContainer: {
    width: 200,
  },
  getBtnContainer: {
    width: 200,
  },
  Img: {
    width: 100,
    height: 80,
    marginBottom: 15,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  btnText: {
    paddingTop: 5,
    // paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 25,
    color: '#fff',
  },
})

class Profile extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true
    }
  }
  
  static navigationOptions = {
    // title: 'Home',
    // headerStyle: {
    // backgroundColor: 'red',
    // },
    // headerTintColor: '#fff',
    // headerTitleStyle: {
    //   fontWeight: 'bold',
    // },
    tabBarOptions: {
      activeBackgroundColor: "#5E1284",
      activeTintColor: "#fff",
      inactiveBackgroundColor: '#000',
      labelStyle: {
        fontSize: 15,
        paddingBottom: 10,
      },
    }
  }
  
  componentDidMount() {
    this.checkIflogedIn()
  }
  
  checkIflogedIn = async () => {
    let user = await AsyncStorage.getItem('user')
    let pass = await AsyncStorage.getItem('password')
    if (user !== null) {
      console.log(user)
        this.fetchUserData(user, pass)
    }
  }
  
  fetchUserData = (userPhone, password) => {
    console.log(`User: ${userPhone} Pass: ${password}`)
    fetch('http://192.168.15.1:3200/signin', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: userPhone,
            pass: password
        })
    })
    .then(res => res.json())
        .then( data => {
          console.log(`Data user: ${data.user}`)
          if (data.status) {
            this.props.storeUserData(data.user)
            this.setState({isLoading: false})
            } else {
                alert(data.message)
            }
        }).catch(err => console.log(err))
  }
  
  handleOnPress = (choice) => {
    this.props.navigation.navigate(`${choice}`, {date: new Date()})
  }
  
  render() {
    if (this.state.isLoading === true)
            return <View><Text>Loading...</Text></View>
    return (
      // <LinearGradient style={styles.container} colors={['#170020', '#5E0084']}
      //   start={{x: 0.5, y: 0.5}} end={{x: 0.5, y: 1}}>
      <View style={styles.container}>
        <Text style={styles.title}> Profile Screen </Text>
        <View style={styles.BtnsContainer}>
          <View style={styles.giveBtnContainer}>
            <TouchableOpacity
              ref="give"
              style={styles.btn}
              onPress={() => this.handleOnPress('GiveTask')}
            >
              <Image
                source={require('../../assets/give_task.png')}
                style={styles.Img}
              />
              <Text style={styles.btnText}>Give Task</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.getBtnContainer}>
            <TouchableOpacity
              ref="get"
              style={styles.btn}
              onPress={() => this.handleOnPress('Gotten')}
            >
              <Image
                source={require('../../assets/get_task.png')}
                style={styles.Img}               
              />
                <Text style={styles.btnText}>Get Task</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      // </LinearGradient>
    )
  }
}

const mapStateToProps = state => ({
  user: state.tasksReducer.user
})

export default connect(mapStateToProps, { storeUserData })(Profile)
