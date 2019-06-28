import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import { name as appName } from './app.json'
import {Provider} from 'react-redux'
import store from './store'

import NavigatorContainer from './App'

class MyApp extends Component {
    render() {
        return (    
            <Provider store={ store }>
                <NavigatorContainer />
            </Provider>
        )
    }
}
      
AppRegistry.registerComponent(appName, () => MyApp);
