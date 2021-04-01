import React from 'react';
import {View,Text, TouchableOpacity, Modal, Platform} from 'react-native';
import {DrawerItems} from 'react-navigation-drawer' ;
import firebase from 'firebase'; 
import db from '../config';
import {AdMobBanner, AdMobRewarded, setTestDeviceIDAsync} from 'expo-ads-admob';
import {Icon } from 'react-native-elements';

var adRewarded = false

export default class CustomSideBarMenu extends React.Component{
        constructor(props){
        super(props);
        this.state = {
            userEmail :  firebase.auth().currentUser.email,
            modalVisible: false,
            adRewarded: false
            
        }
    }

    componentDidMount(){
        adRewarded = false
    }
    
         initRewardAds = async () => {
            await AdMobRewarded.setAdUnitID("ca-app-pub-1211516081114981/3301516184")
            // await AdMobRewarded.setAdUnitID("ca-app-pub-3940256099942544/5224354917"); google test id
            await AdMobRewarded.requestAdAsync();
            AdMobRewarded.addEventListener("rewardedVideoDidClose", () => {
                this.setState({
                    modalVisible: false
                })
            })
            AdMobRewarded.addEventListener("rewardedVideoDidRewardUser", () => {
                this.setState({
                    adRewarded: true    
                })
                adRewarded = true
            })
            await AdMobRewarded.showAdAsync();
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
                    
                    <View style = {{flex: 0.2, justifyContent: 'flex-end', marginBottom: 70}}>
                    <TouchableOpacity
                    onPress = {() => {
                        this.setState({modalVisible: true})
                    }}
                        style = {{
                            alignSelf: 'center',
                            backgroundColor : '#939597',
                            borderRadius : 20,
                            width: 200,
                            height: 30,
                            alignItems: 'center',
                            borderWidth: 2
                        }}
                    >
                            <Text style={{fontSize : 18, textAlign: 'center', color: 'white'}}> Remove Ads </Text>
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
                        visible = {this.state.modalVisible}
                    >
    
                        <View style = {{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 22,
                        }}>
                            <View style = {{
                                margin: 20,
                                backgroundColor: "#3498DB",
                                borderRadius: 5,
                                padding: 35,
                                alignItems: "center",
                                shadowColor: "#000",
                                shadowOffset: {
                                  width: 0,
                                  height: 2,
                                },
                            }}>
                                <Text style = {{
                                     marginBottom: 15,
                                     textAlign: "center",
                                     color: 'white',
                                     fontSize: 20
                                }}>
                                    Watch Video To Remove Ads
                                </Text>
    
                                <TouchableOpacity style = {{
                                    backgroundColor: "#F194FF",
                                    borderRadius: 20,
                                    padding: 10,
                                    marginTop:10,
                                    elevation: 2,
                                }} onPress = {() => this.initRewardAds()}>
                                    <Text style = {{
                                        color: "white",
                                        fontWeight: "bold",
                                        textAlign: "center",
                                        fontSize: 15
                                    }}> Watch Ad </Text>
                                </TouchableOpacity>
    
                                <TouchableOpacity
                                style = {{
                                    backgroundColor: "#F194FF",
                                    borderRadius: 20,
                                    padding: 10,
                                    marginTop:10,
                                    elevation: 2,
                                }}
                                onPress = {() => this.setState({modalVisible: false})}>
                                    <Text style = {{
                                        color: "white",
                                        fontWeight: "bold",
                                        textAlign: "center",
                                        fontSize: 15
                                    }}> Nope </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
    
                    </Modal>
                
                </View>
    
            )   
        }
    }

}

export {adRewarded};