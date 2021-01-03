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

// import React from "react";
// import Slider from "react-native-slider"; // 0.11.0
// import { StyleSheet, View, Text } from "react-native";

// export default class App extends React.Component {
//   state = {
//     value: 0.2
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <Slider
//           value={this.state.value}
//           onValueChange={value => this.setState({ value })}
//         />
//         <Text>
//           Value: {this.state.value}
//         </Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginLeft: 10,
//     marginRight: 10,
//     alignItems: "stretch",
//     justifyContent: "center"
//   }
// });


