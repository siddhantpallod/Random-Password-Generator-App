import React, {useEffect} from 'react';
import GenerateScreen from './screens/GenerateScreen';
import Login from './screens/Login';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {AppDrawerNavigator} from './components/AppDrawerNavigator';
import SavedPasswordsScreen from './screens/SavedPasswordsScreen';
import {AppTabNavigator} from './components/AppTabNavigator';
import AppIntroSlider from 'react-native-app-intro-slider';
import {View, Text, StyleSheet, Image} from 'react-native';
import Intro from './screens/Intro';


export default class App extends React.Component {
  render(){
      return (
        <AppContainer/>
      )
  }
}

const switchNavigator = createSwitchNavigator({
  Login : {screen : Login},
  Intro: {screen: Intro},
  Drawer : {screen : AppDrawerNavigator},
  BottomTab : {screen : AppTabNavigator},
})

const AppContainer = createAppContainer(switchNavigator)