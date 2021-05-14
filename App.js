import React, {useState} from 'react';
import GenerateScreen from './screens/GenerateScreen';
import Login from './screens/Login';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {AppDrawerNavigator} from './components/AppDrawerNavigator';
import SavedPasswordsScreen from './screens/SavedPasswordsScreen';
import {AppTabNavigator} from './components/AppTabNavigator';
import Intro from './screens/Intro';
import firebase from 'firebase';

export default class App extends React.Component{
  constructor(){
    super()
    this.state = {
      user: null
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.setState({user})
      }
      else{
        this.setState({user: null})
      }
    })
  }

  render(){

          if(!this.state.user) return <AppContainer/>
          else{
    
          return (
            <AppContainer1/>
          )
          }
        }

}


const switchNavigator = createSwitchNavigator({
  Login : {screen : Login},
  Intro: {screen: Intro},
  Drawer : {screen : AppDrawerNavigator},
  BottomTab : {screen : AppTabNavigator},
})

const switchNavigator1 = createSwitchNavigator({
  Drawer : {screen : AppDrawerNavigator},
  BottomTab : {screen : AppTabNavigator},
  Login: {screen: Login}
})

const AppContainer = createAppContainer(switchNavigator)
const AppContainer1 = createAppContainer(switchNavigator1)
