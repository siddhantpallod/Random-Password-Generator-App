import React from 'react';
import {View,Text, TouchableOpacity, Modal, Platform, ToastAndroid} from 'react-native';
import {DrawerItems} from 'react-navigation-drawer' ;
import firebase from 'firebase'; 
import db from '../config';
import {Icon } from 'react-native-elements';
import {AirbnbRating} from 'react-native-ratings';


export default class CustomSideBarMenu extends React.Component{
        constructor(props){
        super(props);
        this.state = {
            userEmail :  firebase.auth().currentUser.email,
            ratingVisible: false,
        }
    }
      

    render(){
        if(Platform.OS == 'web'){
            return(
                <View style={{flex : 1}}>
    
                    <View style = {{flex : 0.1}}>
                        <Text style = {{
                            textAlign : 'center',
                            fontSize : 20,
                            marginTop : 15,
                            }}> Hi! {this.state.userEmail} </Text>
                    </View>
                    <View style={{flex : 0.8}}> 
                        <DrawerItems  
                            {...this.props}
                        />
                    </View>
                    
                    <View style={{
                            flex : 0.2,
                            justifyContent : 'flex-end',
                        }}>
                        <TouchableOpacity 
                        onPress = {() => { 
                        this.props.navigation.navigate('Login')    
                        firebase.auth().signOut().then(() => {
                            ToastAndroid.show('Logged Out!', ToastAndroid.SHORT)
                        })
                        .catch((error) => {
                            var errorMessage = error.message
                            return alert(errorMessage)
                        })
                    }}
                        style = {{
                            justifyContent : 'flex-end',
                            alignSelf: 'center',
                            backgroundColor : '#939597',
                            borderRadius : 20,
                            marginBottom : 100,
                            width: 200,
                            height: 30,
                            alignItems: 'center',
                            borderWidth: 2
                        }}
                    >
                            <Text style={{fontSize : 18, textAlign: 'center', color: 'white'}}> Logout </Text>
                        </TouchableOpacity>
                    </View>
                </View>
    
            )    
        }
        else{
            return(
                <View style={{flex : 1}}>
    
                    <View style = {{flex : 0.1}}>
                        <Text style = {{
                            textAlign : 'center',
                            fontSize : 20,
                            marginTop : 15,
                            }}> Hi! {this.state.userEmail} </Text>
                    </View>
                    <View style={{flex : 0.8}}> 
                        <DrawerItems  
                            {...this.props}
                        />
                    </View>

                    <View style = {{flex: 0.2, justifyContent: 'flex-end', marginBottom: 50}}>
                        <TouchableOpacity onPress = {() => this.setState({ratingVisible: true})}
                            style = {{
                                alignSelf: 'center',
                                backgroundColor: '#939597',
                                borderRadius: 20,
                                width: 200,
                                height: 30,
                                alignItems: 'center',
                                borderWidth: 2,
                                marginBottom: '5%'
                            }}
                        >
                            <Text style = {{fontSize: 18, textAlign: 'center', color: 'white'}} > Rate The App? </Text>
                        </TouchableOpacity>
                    </View>
    
                    <View style={{
                            flex : 0.2,
                            justifyContent : 'flex-end',
                        }}>
                        <TouchableOpacity 
                        onPress = {() => { 
                        this.props.navigation.navigate('Login')    
                        firebase.auth().signOut
                    }}
                        style = {{
                            justifyContent : 'flex-end',
                            alignSelf: 'center',
                            backgroundColor : '#939597',
                            borderRadius : 20,
                            marginBottom : 100,
                            width: 200,
                            height: 30,
                            alignItems: 'center',
                            borderWidth: 2
                        }}
                    >
                            <Text style={{fontSize : 18, textAlign: 'center', color: 'white'}}> Logout </Text>
                        </TouchableOpacity>
                    </View>
    
                    <Modal
                    animationType = 'slide'
                    transparent = {true}
                    visible = {this.state.ratingVisible}>
                        <View style = {{
                            justifyContent: 'center',
                            flex: 1,
                            alignItems: 'center',
                            backgroundColor: '#55B4B0'
                        }} >
                            <AirbnbRating
                                defaultRating = {3}
                                onFinishRating = {(rating) => {
                                    ToastAndroid.show('Thank You!', ToastAndroid.SHORT)
                                    db.collection('ratings').add({
                                        user: firebase.auth().email,
                                        rating: rating
                                    })

                                    this.setState({
                                        ratingVisible: false
                                    })
                                }}
                            />

                            <TouchableOpacity
                            style = {{
                            alignSelf: 'center',
                            backgroundColor : '#939597',
                            borderRadius : 20,
                            width: 200,
                            height: 30,
                            alignItems: 'center',
                            borderWidth: 2,
                            marginTop: 30
                            }}
                            onPress = {() => this.setState({ratingVisible: false})} >
                                <Text style = {{fontSize: 18, textAlign: 'center', color: 'white'}}> No, Thanks </Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>                
                </View>
    
            )   
        }
    }

}