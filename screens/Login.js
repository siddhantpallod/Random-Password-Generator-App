import React from 'react';
import {ImageBackground, Text, View  } from 'react-native';
import firebase from 'firebase';
import db from '../config';
import {auth, provider} from '../config';
import {SocialIcon} from 'react-native-elements';
import Button from '@material-ui/core/Button';
import {TextInput} from 'react-native-paper';
import FirebaseUserMetadata from 'firebase'


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
            })
            alert("Login Successful!")

        })
        .catch(error => alert(error.message))
    }

    userLogin = (email,password) => {
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then((result)=>{
            // FirebaseUserMetadata  = auth.getCurrentUser().getMetadata();
            // if (FirebaseUserMetadata.getCreationTimestamp() == FirebaseUserMetadata.getLastSignInTimestamp()) {
                // The user is new, show them a fancy intro screen!
                this.props.navigation.navigate('Intro')
            // } else {
                // This is an existing user, show them a welcome back screen.
                // this.props.navigation.navigate('Generate')
            // }

            
            
            alert("Login Successful!")

            db.collection('users').add({
                'email': this.state.email,
                'password': this.state.password,
            })
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


                        <Text style = {{
                            textAlign: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            marginTop: 17,
                            fontSize: 25
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
                                backgroundColor : '#00ff00',
                                borderRadius : 10,
                                width : 200,
                                marginBottom: 154,
                                height: 30
                            }}
                            type = 'google'
                            
                        />
                </ImageBackground>
            </View>
        )
    }
}


