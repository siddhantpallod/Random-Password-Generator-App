import React from 'react';
import { Text, View } from 'react-native';
import GenerateScreen from './screens/GenerateScreen';
import LoginScreen from './screens/LoginScreen';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {AppDrawerNavigator} from './components/AppDrawerNavigator';
import SavedPasswordsScreen from './screens/SavedPasswordsScreen';

export default class App extends React.Component {
  render(){
  return (
    <View>
      <AppContainer/>
      {/* <SavedPasswordsScreen/> */}
    </View>
  );
  }
}

const switchNavigator = createSwitchNavigator({
  Generate : {screen : GenerateScreen},  
  Drawer : {screen : AppDrawerNavigator}
})

const AppContainer = createAppContainer(switchNavigator)
