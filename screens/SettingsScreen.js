import React from 'react';
import { Text, View, TouchableOpacity, ImageBackground, Platform } from 'react-native';
import firebase from 'firebase';
import {TextInput, Modal} from 'react-native-paper';
import MyHeader from '../components/MyHeader';
import { AdMobBanner, setTestDeviceIDAsync } from 'expo-ads-admob';

export default class SettingsScreen extends React.Component {

    constructor(){
        super();
        this.state = {
            currentUser: firebase.auth().currentUser,
            updatedPassword: '',
            deletUserModal: false
        }
    }

    updatePassword = (password) => {
        firebase.auth().currentUser.updatePassword(password).then(() => {
            alert('Password Updated')
        }).catch((error) => {
            var errorMessage = error.message
            alert(errorMessage)
        })
    }

    deleteUser = () => {
        firebase.auth().currentUser.delete().then(() => {
            alert('User Deleted')
            this.props.navigation.navigate('Login')
        }).catch((error) => {
            var message = error.message
            alert(message)
        })
    }

    render() {
        if(Platform.OS == 'web'){
        return (
            <View>
                <ImageBackground source = {require('../assets/gradient3.png')}
                    style = {{width: '100%', height: '100%'}}
                >
                <MyHeader
                    title = {'Settings'}
                    navigation = {this.props.navigation}
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
                    label = 'Update Password'
                    mode = 'flat'
                    secureTextEntry = {true}
                    type = 'password'
                    onChangeText = {(text) => {
                        this.setState({
                            updatedPassword: text
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
                marginTop: 30,
                borderWidth: 2
            }}
            onPress = {() => this.updatePassword(this.state.updatedPassword)}>
                <Text
                    style = {{
                        color: 'white',
                        fontSize: 20
                    }}
                > Update Password </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress = {() => this.setState({deletUserModal: true})}
                style = {{
                    alignItems: 'center',
                    backgroundColor: 'red',
                    width: 200,
                    height: 30,
                    justifyContent:'center',
                    borderRadius: 10,
                    alignSelf: 'center',
                    marginTop: 30,
                    borderWidth: 2,
                    marginBottom: 400
                }}
            >
                <Text style = {{fontSize: 20, fontWeight: 'bold'}}> Delete Account </Text>
            </TouchableOpacity>

            </ImageBackground>

            <Modal 
            visible = {this.state.deletUserModal} 
            onDismiss = {() => this.setState({deletUserModal: false})}
            >

                        <Text style = {{
                            color: "white",
                            fontWeight: "bold",
                            textAlign: "center",
                            fontSize: 20}}> Are You Sure You Want To Delete The Account? </Text>
                        <Text style = {{
                            fontWeight: 'bold',
                            textAlign: 'center',
                            fontSize: 15,
                            color: 'white',
                            marginTop: 20
                        }}> All your information including saved password will be deleted. </Text>

                        <TouchableOpacity 
                        style = {{
                            alignItems: 'center',
                            backgroundColor: 'red',
                            width: 200,
                            height: 30,
                            justifyContent:'center',
                            borderRadius: 10,
                            alignSelf: 'center',
                            marginTop: 15,
                            borderWidth: 2,
                        }}
                        onPress = {() => {
                            this.deleteUser()
                            this.setState({deletUserModal: false})
                        }}
                        >
                            <Text
                            style = {{
                            fontSize: 20,
                            fontWeight: 'bold'
                            }}
                            >
                                Delete
                            </Text>
                        </TouchableOpacity>
                    </Modal>
            </View>

        )
        }
        else{
            return (
                <View>
                    <ImageBackground source = {require('../assets/gradient3.png')}
                        style = {{width: '100%', height: '100%'}}
                    >
                    <MyHeader
                        title = {'Settings'}
                        navigation = {this.props.navigation}
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
                        label = 'Update Password'
                        mode = 'flat'
                        secureTextEntry = {true}
                        type = 'password'
                        onChangeText = {(text) => {
                            this.setState({
                                updatedPassword: text
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
                    marginTop: 30,
                    borderWidth: 2
                }}
                onPress = {() => this.updatePassword(this.state.updatedPassword)}>
                    <Text
                        style = {{
                            color: 'white',
                            fontSize: 20
                        }}
                    > Update Password </Text>
                </TouchableOpacity>
    
                <TouchableOpacity
                    onPress = {() => this.setState({deletUserModal: true})}
                    style = {{
                        alignItems: 'center',
                        backgroundColor: 'red',
                        width: 200,
                        height: 30,
                        justifyContent:'center',
                        borderRadius: 10,
                        alignSelf: 'center',
                        marginTop: 30,
                        borderWidth: 2,
                        // marginBottom: 400
                    }}
                >
                    <Text style = {{fontSize: 20, fontWeight: 'bold'}}> Delete Account </Text>
                </TouchableOpacity>
    
                <AdMobBanner
                            bannerSize = "smartBannerPortrait"
                            setTestDeviceIDAsync = "EMULATOR"
                            adUnitID = "ca-app-pub-1211516081114981/5167199993"
                            // adUnitID = "ca-app-pub-3940256099942544/6300978111" test id of google
                            // onDidFailToReceiveAdWithError = {(e) => alert(e)}
                        />
    
                </ImageBackground>
    
                <Modal 
                visible = {this.state.deletUserModal} 
                onDismiss = {() => this.setState({deletUserModal: false})}
                >
    
                            <Text style = {{
                                color: "white",
                                fontWeight: "bold",
                                textAlign: "center",
                                fontSize: 20}}> Are You Sure You Want To Delete The Account? </Text>
                            <Text style = {{
                                fontWeight: 'bold',
                                textAlign: 'center',
                                fontSize: 15,
                                color: 'white',
                                marginTop: 20
                            }}> All your information including saved password will be deleted. </Text>
    
                            <TouchableOpacity 
                            style = {{
                                alignItems: 'center',
                                backgroundColor: 'red',
                                width: 200,
                                height: 30,
                                justifyContent:'center',
                                borderRadius: 10,
                                alignSelf: 'center',
                                marginTop: 15,
                                borderWidth: 2,
                            }}
                            onPress = {() => {
                                this.deleteUser()
                                this.setState({deletUserModal: false})
                            }}
                            >
                                <Text
                                style = {{
                                fontSize: 20,
                                fontWeight: 'bold'
                                }}
                                >
                                    Delete
                                </Text>
                            </TouchableOpacity>
                        </Modal>
                </View>
    
            )
        }
    }
}

