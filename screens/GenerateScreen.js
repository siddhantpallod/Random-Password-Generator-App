import React from 'react';
import { View, Text, TextInput, ImageBackground, TouchableOpacity,Clipboard} from 'react-native';
import {Icon} from 'react-native-elements';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';

export default class GenerateScreen extends React.Component {
  
  constructor(){
    super();
    this.state = {
      email : firebase.auth().currentUser.email,
      generatedPassword : '',
      clipboardText: ""    
    }
  }

  createUniquePassword(){
    return Math.random().toString(36).substring(2)
  }

  createPassword = () => {
    var password = this.createUniquePassword()
    this.setState({generatedPassword : password})
  }

  createUniqueId = () => {
    return Math.random().toString(36).substring(7)
  }

  addToSavedPasswords = () => {
    
    if(!this.state.generatedPassword){
      alert(" First Please Click Generate Button To Generate Password")
    }
    else{
      var id = this.createUniqueId()
      db.collection('savedPasswords').add({
        savedPassword : this.state.generatedPassword,
        savedDate : firebase.firestore.FieldValue.serverTimestamp(),
        userEmail : this.state.email,
        docId : id
        
      })
  
      this.setState({
        generatedPassword : ''
      })

      alert("Password Saved!")
    }

    
  }

  setTextIntoClipboard = async () => {
   
    if(!this.state.generatedPassword){
      alert("First Please Click Generate Button To Generate Password")
    }
    else {
    await Clipboard.setString(this.state.generatedPassword);
    alert("Password Copied!")
  }
}

  

  render() {
    return (
      <View style={{flex : 1}}>  

      <MyHeader
        title = {'Generate Password'}
        navigation = {this.props.navigation}
      />


        <ImageBackground 
        source = {require('../assets/gradient.jpg')}
        style = {{height: 558,}}>

        <TextInput
          style={{
            width : 300,
            height: 70,
            borderWidth : 3,
            alignSelf : 'center',
            borderColor: 'white',
            fontSize : 30,
            marginTop : 150,
            textAlign : 'center'
            
          }}
          placeholder = {this.state.generatedPassword}
          placeholderTextColor = 'white'
          editable = {false}
        />

        <TouchableOpacity onPress={this.setTextIntoClipboard} 
        activeOpacity={0.7} 
        style={{
          alignSelf : 'center',
          marginLeft : 340,
          marginTop : -50
          }} >
              <Icon
                name = 'copy'
                type = 'feather'
                size = {25}
                color = 'white'
              />
        </TouchableOpacity>
          
          <TouchableOpacity 
            style={{
              alignSelf : 'center',
              marginTop : 50,
              backgroundColor : 'orange',
              borderRadius : 10
            }}
            onPress = {()=> this.createPassword()}
            >
            
            <Text style={{
              fontSize: 20, 
              color : 'black',
              fontWeight : '700'}}> 
              Generate Password </Text>
          </TouchableOpacity>

          <View style={{flexDirection : 'row',alignSelf : 'center',}}>

          <TouchableOpacity 
          onPress = {()=> {
            this.setState({
              generatedPassword : ''
            })
          }}
          style={{
            flexDirection : 'row', 
            alignSelf : 'center',
            backgroundColor : '#ff0000',
            marginTop: 30,
            marginRight : 50,
            borderRadius : 7
            }}>
          
          <Text style={{
              color : 'black', 
              textAlign : 'center', 
              fontSize : 20,
              fontWeight : '600'
              }}> 
              Cancel
            </Text>
              
          <Icon
              name = 'x'
              type = 'feather'
              color = 'black'
              size = {25}
            />
          </TouchableOpacity>

          <TouchableOpacity 
          style={{
            flexDirection : 'row', 
            alignSelf : 'center',
            backgroundColor : '#1ff91f',
            marginTop : 30,
            borderRadius : 7
            }}
            onPress = {()=> {
              this.addToSavedPasswords()
            }}
            >
            
            <Text style={{
              color : 'black', 
              textAlign : 'center', 
              fontSize : 20,
              fontWeight : '600'
              }}> 
              Save 
            </Text>

            <Text>  </Text>
            
            <Icon
              name = 'save'
              type = 'font-awesome'
              color = 'black'
              size = {25}
            />
          </TouchableOpacity>
          </View>

          
 
        </ImageBackground>
      </View>
    );
  }
}

