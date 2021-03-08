import React from 'react';
import { TouchableOpacity,ImageBackground, Text, View,TextInput } from 'react-native';
import firebase from 'firebase';
import db from '../config';
import {auth, provider} from '../config';
import { Button } from '@material-ui/core';

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
            console.log(result);
            this.props.navigation.navigate('Generate')
            alert("Login Successful!")
        })
        .catch(error => alert(error.message))
    }

    userLogin = (email,password) => {
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then(()=>{
            this.props.navigation.navigate('Generate')
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
                password : this.state.password
            })
            
            return alert("User Added Successfully")
        })

        .catch((error)=> {
            var errorMessage = error.message
            return alert(errorMessage)
        })
}

    render() {
        return (
            <View>
                <ImageBackground source = {require('../assets/gradient2.png')}>
                    <View style = {{backgroundColor : '#ff6561'}}>
                        <Text style = {{
                            textAlign : 'center',
                            fontSize : 25
                        }}> Random Password Generator </Text>
                    </View>

                        <TextInput
                            style = {{
                                alignSelf: 'center',
                                borderWidth : 2,
                                marginTop : 100,
                                width: 300,
                                height: 50,
                                fontSize : 20,
                                color: 'white'
                            }}
                            placeholder = "Email"
                            placeholderTextColor = 'white'
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
                                borderWidth : 2,
                                marginTop : 30,
                                width: 300,
                                height: 50,
                                fontSize : 20,
                                color: 'white'
                                }}
                        
                            secureTextEntry = {true}
                            placeholder = "Password"
                            placeholderTextColor = 'white'
                            onChangeText = {(text)=> {
                                this.setState({
                                    password : text
                                })
                            }}
                            />

                        <TouchableOpacity 
                            onPress = {()=> {
                            this.userLogin(this.state.email,this.state.password)
                        }}
                            style={{
                                alignSelf: 'center',
                                marginTop : 30,
                                backgroundColor : '#00ff00',
                                borderRadius : 10,
                                width : 200  
                            }}
                        >
                            <Text style={{
                                fontSize : 20,
                                textAlign : 'center'
                            }}> Login </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress = {()=> this.userSignUp(this.state.email, this.state.password)}
                            style={{
                                alignSelf: 'center',
                                marginTop : 15,
                                backgroundColor : '#00ff00',
                                borderRadius : 10,
                                width : 200 ,
                            }}
                        >

                            <Text 
                                style={{
                                    fontSize : 20,
                                    textAlign : 'center'
                                }}
                            > Sign Up </Text>
                    </TouchableOpacity>

                    
                    <TouchableOpacity 
                            onPress = {()=> this.userSignInWithGoogle()}

                            style={{
                                marginTop: 15,
                                alignSelf: 'center',
                                justifyContent: 'center',
                                backgroundColor : '#00ff00',
                                borderRadius : 10,
                                width : 200,
                                marginBottom: 198
                            }}
                        >
                            <Text style={{
                                fontSize : 20,
                                textAlign : 'center'
                            }}> Sign In With Google </Text>
                        </TouchableOpacity>

                </ImageBackground>
            </View>
        )
    }
}
