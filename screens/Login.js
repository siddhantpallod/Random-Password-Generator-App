import React from 'react';
import { TouchableOpacity,ImageBackground, Text, View,TextInput } from 'react-native';
import firebase from 'firebase';
import db from '../config';
import {auth, provider} from '../config';
import {SocialIcon} from 'react-native-elements';
import Button from '@material-ui/core/Button';

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
                                color: 'white',
                            }}
                            type = 'email'
                            placeholder = 'Email'
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
                            placeholder = 'Password'
                            placeholderTextColor = 'white'
                            type = 'password'
                            onChangeText = {(text)=> {
                                this.setState({
                                    password : text
                                })
                            }}
                            />
                                
                    <Button style = {{
                        marginTop: 15,
                        alignSelf: 'center',
                        justifyContent: 'center',
                        backgroundColor : '#00ff00',
                        borderRadius : 10,
                        width : 200,
                        height: 30,
                        color: 'white',
                        fontSize: 20
                    }} variant = 'contained' onClick = {() => this.userLogin(this.state.email,this.state.password)} > Log In </Button>
                  
                  <Button style = {{
                        marginTop: 15,
                        alignSelf: 'center',
                        justifyContent: 'center',
                        backgroundColor : '#00ff00',
                        borderRadius : 10,
                        width : 200,
                        height: 30,
                        color: 'white',
                        fontSize: 20
                    }} variant = 'contained' onClick = {() => this.userSignUp(this.state.email, this.state.password)} > Sign Up </Button>

                        <SocialIcon
                            title = 'LOG IN WITH GOOGLE'
                            raised 
                            button
                            onPress = {()=> this.userSignInWithGoogle()}
                            style = {{
                                marginTop: 15,
                                alignSelf: 'center',
                                justifyContent: 'center',
                                backgroundColor : '#00ff00',
                                borderRadius : 10,
                                width : 200,
                                marginBottom: 203,
                                height: 30
                            }}
                            type = 'google'
                            
                        />
                </ImageBackground>
            </View>
        )
    }
}
