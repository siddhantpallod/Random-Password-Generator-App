import React from 'react';
import GenerateScreen from './screens/GenerateScreen';
import Login from './screens/Login';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {AppDrawerNavigator} from './components/AppDrawerNavigator';
import SavedPasswordsScreen from './screens/SavedPasswordsScreen';
import {AppTabNavigator} from './components/AppTabNavigator';

export default function App(){
  return (
      <AppContainer/>
      //  <SavedPasswordsScreen/>
  );
}

const switchNavigator = createSwitchNavigator({
  Login : {screen : Login},
  Drawer : {screen : AppDrawerNavigator},
  BottomTab : {screen : AppTabNavigator},
  // Generate : {screen : GenerateScreen},
})

const AppContainer = createAppContainer(switchNavigator)