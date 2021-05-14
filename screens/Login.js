import React from 'react';
import {ImageBackground, Text, View, TouchableOpacity, Platform, StatusBar, Alert } from 'react-native';
import firebase from 'firebase';
import db from '../config';
import {auth, provider} from '../config';
import {SocialIcon} from 'react-native-elements';
import {TextInput, Modal} from 'react-native-paper';
import * as GoogleAuth from 'expo-google-app-auth';
import { ToastAndroid } from 'react-native';

export default class Login extends React.Component {

    constructor(){
        super();
        this.state = {
            email : '',
            password : '',
            forgotEmail: '',
            modalVisible: false,
            userLoggedIn: false
        }
    }

    signInWithGoogle = () => {
        GoogleAuth.logInAsync({
            androidClientId: '922087192991-j2fhtdigvd5lkoq8od6dgl7f97gvr46h.apps.googleusercontent.com',
            androidStandaloneAppClientId: '922087192991-qbk40u3ouqrns0h6qf0b9gikfv5pbnfa.apps.googleusercontent.com',
            scopes : ['profile', 'email']
        })
        .then((loginResult) => {
            if(loginResult.type === 'success'){
                const {idToken, accessToken} = loginResult;
                const credential = firebase.auth.GoogleAuthProvider.credential(
                    idToken,
                    accessToken
                );

                this.props.navigation.navigate('Generate')
                firebase.auth().signInWithCredential(credential)
                ToastAndroid.show('Logged In!', ToastAndroid.SHORT)

            }
            return Promise.reject()
        })
        .catch((error) => {
            Alert.alert(error.message)
        })
    }

    userSignInWithGoogle = () => {
        auth.signInWithPopup(provider).then(result => {
            this.props.navigation.navigate('Intro')
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


                if(Platform.OS == 'web'){
                    alert("Login Successful!")
                }
                  else if(Platform.OS == 'android'){
                    ToastAndroid.show("Login Successful!", ToastAndroid.SHORT)
                  }

            
        })
        .catch((error)=> {
           var errorMessage = error.message
            return Alert.alert(errorMessage)
       })
      }

      userSignUp = (email,password) => {
        firebase.auth().createUserWithEmailAndPassword(email,password).then(()=> {

            this.userLogin(this.state.email, this.state.password)

            if(Platform.OS == 'web'){
                return alert("User Added Successfully")
            }
            else if(Platform.OS == 'android'){
                ToastAndroid.show("User Added Successfully!", ToastAndroid.SHORT)
            }
            
        })

        .catch((error)=> {
            var errorMessage = error.message
            return Alert.alert(errorMessage)
        })
    }
    
    forgotPassword = (email) => {
        firebase.auth().sendPasswordResetEmail(email)
        .catch((error) => {
            var errorMessage = error.message
            return Alert.alert(errorMessage)
        })
    }

    render() {
        if(Platform.OS == 'web'){
            return (
                <View>
                    <StatusBar barStyle = 'light-content' hidden = {false} translucent = {false}  />
                    <ImageBackground style = {{width: '100%', height: '100%'}} source = {require('../assets/gradient2.jpg')}>
                        
                        <View style = {{backgroundColor : '#ff6561'}}>
                            <Text style = {{
                                textAlign : 'center',
                                fontSize : 25,
                                fontWeight: 'bold'
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
                                    height: 30,
                                    borderWidth: 1,
                                }}
                                type = 'google'   
                            />
                            <TouchableOpacity onPress = {() => this.setState({modalVisible: true})}>
                                <Text style = {{
                                    color: 'white',
                                    fontSize: 18,
                                    textAlign: 'center',
                                    marginTop: 50,
                                    textDecorationLine: 'underline',
                                    marginBottom: 58
                                }}> Forgot Your Password? </Text>
                            </TouchableOpacity>

                    </ImageBackground>

                    <Modal 
            visible = {this.state.modalVisible} 
            onDismiss = {() => this.setState({modalVisible: false})}
            >
                    <TextInput
                            style = {{
                                alignSelf: 'center',
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
                                    forgotEmail : text
                                })       
                            }}
                        />
                        <TouchableOpacity 
                        style = {{
                            alignItems: 'center',
                            backgroundColor: '#939597',
                            width: 200,
                            height: 30,
                            justifyContent:'center',
                            borderRadius: 10,
                            alignSelf: 'center',
                            marginTop: 15,
                            borderWidth: 2
                        }}
                        onPress = {() => {
                            this.forgotPassword(this.state.forgotEmail)
                            Alert.alert('Please Check Your Email')
                            this.setState({modalVisible: false})
                        }}
                        >
                            <Text
                            style = {{
                            color: 'white',
                            fontSize: 20
                            }}
                            >
                                Mail Me
                            </Text>
                        </TouchableOpacity>
                    </Modal>
                </View>
                )
        }
        else{
            
            return (
                <View>
                    <StatusBar barStyle = 'light-content' hidden = {false} translucent = {false}  />
                    <ImageBackground style = {{width: '100%', height: '100%'}} source = {require('../assets/gradient2.jpg')}>
                        
                        <View style = {{backgroundColor : '#ff6561'}}>
                            <Text style = {{
                                textAlign : 'center',
                                fontSize : 25,
                                fontWeight: 'bold'
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
                            }} > ----------OR---------- </Text>
                            
                            <SocialIcon
                                title = 'LOG IN WITH GOOGLE'
                                raised 
                                button
                                onPress = {() => this.signInWithGoogle()}
                                style = {{
                                    marginTop: 15,
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                    backgroundColor : '#939597',
                                    borderRadius : 10,
                                    width : 200,
                                    height: 30,
                                    borderWidth: 1,
                                }}
                                type = 'google'/>

                            <TouchableOpacity onPress = {() => this.setState({modalVisible: true})}>
                                <Text style = {{
                                    color: 'white',
                                    fontSize: 18,
                                    textAlign: 'center',
                                    marginTop: 50,
                                    textDecorationLine: 'underline'
                                }}> Forgot Your Password? </Text>
                            </TouchableOpacity>

                    </ImageBackground>

          <Modal 
            visible = {this.state.modalVisible} 
            onDismiss = {() => this.setState({modalVisible: false})}
            >
                    <TextInput
                            style = {{
                                alignSelf: 'center',
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
                                    forgotEmail : text
                                })       
                            }}
                        />
                        <TouchableOpacity 
                        style = {{
                            alignItems: 'center',
                            backgroundColor: '#939597',
                            width: 200,
                            height: 30,
                            justifyContent:'center',
                            borderRadius: 10,
                            alignSelf: 'center',
                            marginTop: 15,
                            borderWidth: 2
                        }}
                        onPress = {() => {
                            this.forgotPassword(this.state.forgotEmail)
                            alert('Please Check Your Email')
                            this.setState({modalVisible: false})
                        }}
                        >
                            <Text
                            style = {{
                            color: 'white',
                            fontSize: 20
                            }}
                            >
                                Mail Me
                            </Text>
                        </TouchableOpacity>
                    </Modal>
                </View>
                )
        }
    }
}