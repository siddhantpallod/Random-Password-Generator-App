import React from 'react';
import {View,Text, TouchableOpacity} from 'react-native';
import {DrawerItems} from 'react-navigation-drawer' ;
import firebase from 'firebase'; 
import db from '../config';

export default class CustomSideBarMenu extends React.Component{

        state = {
            userEmail : firebase.auth().currentUser.email
        }

    render(){
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
                    firebase.auth().signOut
                }}
                    style = {{
                        justifyContent : 'flex-end',
                        alignSelf: 'center',
                        backgroundColor : '#ff9900',
                        borderRadius : 10,
                        borderColor : '#cc3300',
                        borderWidth : 3,
                        marginBottom : 100
                    }}
                >
                        <Text style={{fontSize : 18}}> Logout </Text>
                    </TouchableOpacity>
                </View>
            
            </View>

        )
    }

}