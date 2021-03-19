import React from 'react';
import {ImageBackground, Text, View, Button, TouchableOpacity, Platform, StatusBar } from 'react-native';
import firebase from 'firebase';
import db from '../config';
import {auth, provider} from '../config';
import {SocialIcon} from 'react-native-elements';
import {TextInput} from 'react-native-paper';


export default class Login extends React.Component {

    constructor(){
        super();
        this.state = {
            email : '',
            password : ''
        }
    }

    userSignInWithGoogle = () => {
        auth.signInWithPopup(provider).then(result => {
            this.props.navigation.navigate('Intro')
            db.collection('users').add({
                'email': result.user.email,
                'timestamp': firebase.firestore.FieldValue.serverTimestamp(),
            })
            alert("Login Successful!")

        })
        .catch(error => alert(error.message))
    }

    userLogin = (email,password) => {
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then((result)=>{
            
                if (Platform.OS == 'web'){
                    this.props.navigation.navigate('Intro')
                }
                else{
                    this.props.navigation.navigate('Generate')
                }

            alert("Login Successful!")

            
        })
        .catch((error)=> {
           var errorMessage = error.message
           return alert(errorMessage)
       })
      }

      userSignUp = (email,password) => {
        firebase.auth().createUserWithEmailAndPassword(email,password).then(()=> {
            
            db.collection('users').add({
                userEmail : this.state.email,
                password : this.state.password,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })

            this.userLogin(this.state.email, this.state.password)
            
            return alert("User Added Successfully")
        })

        .catch((error)=> {
            var errorMessage = error.message
            return alert(errorMessage)
        })
}

    render() {
        if(Platform.OS == 'web'){
            return (
                <View>
                    <StatusBar barStyle = 'light-content' hidden = {false} translucent = {false}  />
                    <ImageBackground style = {{width: '100%', height: '100%'}} source = {require('../assets/gradient2.png')}>
                        
                        <View style = {{backgroundColor : '#ff6561'}}>
                            <Text style = {{
                                textAlign : 'center',
                                fontSize : 25
                            }}> Random Password Generator </Text>
                        </View>
                            
                            <TextInput
                                style = {{
                                    alignSelf: 'center',
                                    marginTop : 100,
                                    width: 300,
                                    height: 50,
                                    fontSize : 20,
                                    color: 'white',
                                }}
                                label = 'Email'
                                mode = 'flat'
                                keyboardType = 'email-address'
                                onChangeText = {(text)=> {
                                    this.setState({
                                        email : text
                                    })       
                            }}
                        />
                         
                            <TextInput
                                style = {{
                                    alignSelf: 'center',
                                    marginTop : 30,
                                    width: 300,
                                    height: 50,
                                    fontSize : 20,
                                    color: 'white'
                                    }}
                                mode = 'flat'
                                label = 'Password'
                                secureTextEntry = {true}
                                type = 'password'
                                onChangeText = {(text)=> {
                                    this.setState({
                                        password : text
                                    })
                                }}
                                />
    
                            <TouchableOpacity style = {{
                                alignItems: 'center',
                                backgroundColor: '#939597',
                                width: 200,
                                height: 30,
                                justifyContent:'center',
                                borderRadius: 10,
                                alignSelf: 'center',
                                marginTop: 30,
                                borderWidth: 2
                            }} onPress = {() => this.userLogin(this.state.email, this.state.password)} >
                                <Text style = {{
                                    color: 'white',
                                    fontSize: 20
                                }}> LOG IN </Text>
                            </TouchableOpacity>
    
                            <TouchableOpacity style = {{
                                alignItems: 'center',
                                backgroundColor: '#939597',
                                width: 200,
                                height: 30,
                                justifyContent:'center',
                                borderRadius: 10,
                                alignSelf: 'center',
                                marginTop: 15,
                                borderWidth: 2
                            }} onPress = {() => this.userSignUp(this.state.email, this.state.password)} >
                                <Text style = {{
                                    color: 'white',
                                    fontSize: 20
                                }}> SIGN UP </Text>
                            </TouchableOpacity>
                                    
                            
    
                            <Text style = {{
                                textAlign: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                marginTop: 17,
                                fontSize: 25,
                            }} > --------OR-------- </Text>
                            
                            <SocialIcon
                                title = 'LOG IN WITH GOOGLE'
                                raised 
                                button
                                onPress = {()=> this.userSignInWithGoogle()}
                                style = {{
                                    marginTop: 15,
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                    backgroundColor : '#939597',
                                    borderRadius : 10,
                                    width : 200,
                                    marginBottom: 138,
                                    height: 30,
                                    borderWidth: 1,
                                }}
                                type = 'google'   
                            />
                    </ImageBackground>
                </View>
                )
        }
        else{
            return (
                <View>
                    <StatusBar barStyle = 'light-content' hidden = {false} translucent = {false}  />
                    <ImageBackground style = {{width: '100%', height: '100%'}} source = {require('../assets/gradient2.png')}>
                        
                        <View style = {{backgroundColor : '#ff6561'}}>
                            <Text style = {{
                                textAlign : 'center',
                                fontSize : 25
                            }}> Random Password Generator </Text>
                        </View>
                            
                            <TextInput
                                style = {{
                                    alignSelf: 'center',
                                    marginTop : 100,
                                    width: 300,
                                    height: 50,
                                    fontSize : 20,
                                    color: 'white',
                                }}
                                label = 'Email'
                                mode = 'flat'
                                keyboardType = 'email-address'
                                onChangeText = {(text)=> {
                                    this.setState({
                                        email : text
                                    })       
                            }}
                        />
                         
                            <TextInput
                                style = {{
                                    alignSelf: 'center',
                                    marginTop : 30,
                                    width: 300,
                                    height: 50,
                                    fontSize : 20,
                                    color: 'white'
                                    }}
                                mode = 'flat'
                                label = 'Password'
                                secureTextEntry = {true}
                                type = 'password'
                                onChangeText = {(text)=> {
                                    this.setState({
                                        password : text
                                    })
                                }}
                                />
    
                            <TouchableOpacity style = {{
                                alignItems: 'center',
                                backgroundColor: '#939597',
                                width: 200,
                                height: 30,
                                justifyContent:'center',
                                borderRadius: 10,
                                alignSelf: 'center',
                                marginTop: 30,
                                borderWidth: 2
                            }} onPress = {() => this.userLogin(this.state.email, this.state.password)} >
                                <Text style = {{
                                    color: 'white',
                                    fontSize: 20
                                }}> LOG IN </Text>
                            </TouchableOpacity>
    
                            <TouchableOpacity style = {{
                                alignItems: 'center',
                                backgroundColor: '#939597',
                                width: 200,
                                height: 30,
                                justifyContent:'center',
                                borderRadius: 10,
                                alignSelf: 'center',
                                marginTop: 15,
                                borderWidth: 2
                            }} onPress = {() => this.userSignUp(this.state.email, this.state.password)} >
                                <Text style = {{
                                    color: 'white',
                                    fontSize: 20
                                }}> SIGN UP </Text>
                            </TouchableOpacity>
                    </ImageBackground>
                </View>
                )
        }
        
    }
}


