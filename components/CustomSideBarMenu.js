import React from 'react';
import {View,Text, TouchableOpacity} from 'react-native';
import {DrawerItems} from 'react-navigation-drawer' ;
import firebase from 'firebase'; 
import db from '../config';

export default class CustomSideBarMenu extends React.Component{

        state = {
            userEmail : firebase.auth().currentUser.email,
            name : '',
            docId :''
        }
    


    getUserInfo = () => {
        var email = this.state.email
        db.collection('users').where('userEmail','==',email)
        .onSnapshot(snapshot => {
            snapshot.forEach(doc => {
                this.setState({
                    name : doc.data().firstName + " " + doc.data().lastName,
                    docId : doc.id
                })
            })
        })
    }
    
    componentDidMount(){
        this.getUserInfo()
    }

    render(){
        return(
            <View>
                <View>
                    <DrawerItems  
                        {...this.props}
                    />
                </View>
                <View>
                    <TouchableOpacity 
                    onPress = {() => { 
                    this.props.navigation.navigate('LoginScreen')    
                    firebase.auth().signOut
                }}>
                        <Text> Logout </Text>
                    </TouchableOpacity>
                </View>
            
            </View>

        )
    }

}