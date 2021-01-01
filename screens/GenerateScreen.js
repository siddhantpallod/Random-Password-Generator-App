import React from 'react';
import { View, Text, TextInput } from 'react-native';

export default class GenerateScreen extends React.Component {
  
  constructor(){
    super();
    this.state = {
      generatedPassword : ''
    }
  }

  render() {
    return (
      <View>  
        <TextInput
          placeholder = {this.state.generatedPassword}
        />
      </View>
    );
  }
}

