import React from 'react';
import { View, Text, TextInput, ImageBackground, TouchableOpacity, Clipboard, Platform, ToastAndroid, Alert, Modal, ActivityIndicator} from 'react-native';
import {Icon} from 'react-native-elements';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';
import {AdMobBanner, setTestDeviceIDAsync, AdMobRewarded} from 'expo-ads-admob';

export default class GenerateScreen extends React.Component {
 
  
  constructor(props){
    super(props);
    this.state = {
      email : firebase.auth().currentUser.email,
      generatedPassword : '',
      clipboardText: "" ,
      generatedIntention : '',
      adModal: false,
      adRewarded: false,
      adLoaded: false
    }
  }
  

  initRewards = async() => {
    await AdMobRewarded.setAdUnitID('ca-app-pub-1211516081114981/5110865800')
    
    // await AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/5224354917')
    // test id of google

    await AdMobRewarded.requestAdAsync()

    AdMobRewarded.addEventListener('rewardedVideoDidLoad', () => {
      this.setState({
        adLoaded: false
      })
    })
    
    AdMobRewarded.addEventListener('rewardedVideoDidRewardUser', () => {
      this.setState({adRewarded: true, adLoaded: false})
    })
    AdMobRewarded.addEventListener('rewardedVideoDidClose', () => {
      this.setState({adModal: false})
    })

    await AdMobRewarded.showAdAsync()

  }



  
  createUniquePassword(){
    // var password =  Math.random().toString(36).substring(2)        

    // var generator = require('generate-password')
    // var password = generator.generate({
    //   length: 12,
    //   numbers: true,
    //   uppercase: true,
    //   symbols: true,
    //   excludeSimilarCharacters: true,
    //   exclude: '\|^(){}[]~`<>,./:;^*-_=+"',
    //   strict: true
    // })


    var password = Array(12).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%&?").map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('');
    return password

  }

  createPassword = () => {
    var password = this.createUniquePassword()
    this.setState({generatedPassword : password})
  }

  createUniqueId = () => {
    return Math.random().toString(36).substring(7)
    
  }

  addToSavedPasswords = () => {
    
    if(!this.state.generatedPassword){
        Alert.alert("Please Click Generate Button First To Generate Password.")        

    }
    else{
      var id = this.createUniqueId()
      db.collection('savedPasswords').add({
        savedPassword : this.state.generatedPassword,
        savedDate : firebase.firestore.FieldValue.serverTimestamp(),
        userEmail : this.state.email,
        docId : id,
        intention : this.state.generatedIntention
      })
  
      this.setState({
        generatedPassword : '',
        generatedIntention : '' 
      })

      
        if(Platform.OS == 'web'){
          alert("Password Saved!")
        }
        else if(Platform.OS == 'android'){
          ToastAndroid.show("Password Saved!", ToastAndroid.SHORT)
        }
  }

    
  }

  setTextIntoClipboard = async () => {
   
    if(!this.state.generatedPassword){
        Alert.alert("Please Click Generate Button First To Generate Password")      
    }
    else {
    await Clipboard.setString(this.state.generatedPassword);
    if(Platform.OS == 'web'){
      alert("Password Copied!")
    }
    else if(Platform.OS == 'android'){
      ToastAndroid.show("Password Copied!", ToastAndroid.SHORT)
    }
  }
}

  

  render() {
    if(Platform.OS == 'web'){
    return (
      <View style={{flex : 1}}>  

    

      <MyHeader
        title = {'Generate Password'}
        navigation = {this.props.navigation}
      />
  
        
    


        <ImageBackground 
        source = {require('../assets/gradient.jpg')}
        style = {{height: '100%', width: '100%'}}>

        <TextInput
          style={{
            width : 300,
            height: 70,
            borderWidth : 3,
            alignSelf : 'center',
            borderColor: 'white',
            fontSize : 30,
            marginTop : 150,
            textAlign : 'center'
            
          }}
          placeholder = {this.state.generatedPassword}
          placeholderTextColor = 'white'
          editable = {false}
        />

      <TouchableOpacity onPress={this.setTextIntoClipboard} 
        activeOpacity={0.7} 
        style={{
          alignSelf : 'center',
          marginTop : -50,
          ...Platform.select({
            web: {
              marginLeft: 350
            },
            default: {
              marginLeft: 330
            }
          })
          }} >
              <Icon
                name = 'copy'
                type = 'feather'
                size = {25}
                color = 'white'
              />
        </TouchableOpacity>

        <TextInput
          style={{
            width : 300,
            height: 70,
            borderWidth : 3,
            alignSelf : 'center',
            borderColor: 'white',
            fontSize : 15,
            marginTop : 50,
            textAlign : 'center',
            color : 'white'
          }}
          placeholder = 'Purpose To Use The Password (Optional)'
          placeholderTextColor = 'white'
          onChangeText = {(text) => {
            this.setState({
              generatedIntention: text
            })
          }}
        />
          
          <TouchableOpacity 
            style={{
              alignSelf : 'center',
              marginTop : 50,
              backgroundColor : 'orange',
              borderRadius : 10
            }}
            onPress = {()=> this.createPassword()}
            >
            
            <Text style={{
              fontSize: 20, 
              color : 'black',
            }}> 
              Generate Password </Text>
          </TouchableOpacity>

          <View style={{flexDirection : 'row',alignSelf : 'center',}}>

          <TouchableOpacity 
          onPress = {()=> {
            this.setState({
              generatedPassword : ''
            })
          }}
          style={{
            flexDirection : 'row', 
            alignSelf : 'center',
            backgroundColor : '#ff0000',
            marginTop: 30,
            marginRight : 50,
            borderRadius : 7
            }}>
          
          <Text style={{
              color : 'black', 
              textAlign : 'center', 
              fontSize : 20,
              }}> 
              Cancel
            </Text>
              
          <Icon
              name = 'x'
              type = 'feather'
              color = 'black'
              size = {25}
            />
          </TouchableOpacity>

          <TouchableOpacity 
          style={{
            flexDirection : 'row', 
            alignSelf : 'center',
            backgroundColor : '#1ff91f',
            marginTop : 30,
            borderRadius : 7
            }}
            onPress = {()=> {
              this.addToSavedPasswords()
            }}
            >
            
            <Text style={{
              color : 'black', 
              textAlign : 'center', 
              fontSize : 20,
              }}> 
              Save      
            </Text>

            
            <Icon
              name = 'save'
              type = 'font-awesome'
              color = 'black'
              size = {25}
            />
          </TouchableOpacity>
          </View>
        </ImageBackground>
     
      </View>
    );
      }
      else{
        return (
          <View style={{flex : 1}}>  
    
        
    
          <MyHeader
            title = {'Generate Password'}
            navigation = {this.props.navigation}
          />
  
            <ImageBackground 
            source = {require('../assets/gradient.jpg')}
            style = {{height: '100%', width: '100%'}}>

            <View>
                <TouchableOpacity style = {{
                  backgroundColor: 'purple',
                  width: 70,
                  borderRadius: 30,
                  marginLeft: '-3%',
                  marginTop: '5%',
                  left: 0
                }} onPress = {() => this.setState({adModal: true})}>
                    <Text style = {{color: 'white', textAlign: 'right'}}> Remove Ads? </Text>
                </TouchableOpacity>
              </View>
    
            <TextInput
              style={{
                width : 300,
                height: 70,
                borderWidth : 3,
                alignSelf : 'center',
                borderColor: 'white',
                fontSize : 30,
                marginTop : 70,
                textAlign : 'center'
                
              }}
              placeholder = {this.state.generatedPassword}
              placeholderTextColor = 'white'
              editable = {false}
            />
    
          <TouchableOpacity onPress={this.setTextIntoClipboard} 
            activeOpacity={0.7} 
            style={{
              alignSelf : 'center',
              marginTop : -50,
              ...Platform.select({
                web: {
                  marginLeft: 350
                },
                default: {
                  marginLeft: 330
                }
              })
              }} >
                  <Icon
                    name = 'copy'
                    type = 'feather'
                    size = {25}
                    color = 'white'
                  />
            </TouchableOpacity>
    
            <TextInput
              style={{
                width : 300,
                height: 70,
                borderWidth : 3,
                alignSelf : 'center',
                borderColor: 'white',
                fontSize : 15,
                marginTop : 50,
                textAlign : 'center',
                color : 'white'
              }}
              placeholder = 'Purpose To Use The Password (Optional)'
              placeholderTextColor = 'white'
              onChangeText = {(text) => {
                this.setState({
                  generatedIntention: text
                })
              }}
            />
              
              <TouchableOpacity 
                style={{
                  alignSelf : 'center',
                  marginTop : 50,
                  backgroundColor : 'orange',
                  borderRadius : 10
                }}
                onPress = {()=> this.createPassword()}
                >
                
                <Text style={{
                  fontSize: 20, 
                  color : 'black',
                }}> 
                  Generate Password </Text>
              </TouchableOpacity>
    
              <View style={{flexDirection : 'row',alignSelf : 'center',}}>
    
              <TouchableOpacity 
              onPress = {()=> {
                this.setState({
                  generatedPassword : ''
                })
              }}
              style={{
                flexDirection : 'row', 
                alignSelf : 'center',
                backgroundColor : '#ff0000',
                marginTop: 30,
                marginRight : 50,
                borderRadius : 7,
                }}>
              
              <Text style={{
                  color : 'black', 
                  textAlign : 'center', 
                  fontSize : 20,
                  }}> 
                  Cancel
                </Text>
                  
              <Icon
                  name = 'x'
                  type = 'feather'
                  color = 'black'
                  size = {25}
                />
              </TouchableOpacity>
    
              <TouchableOpacity 
              style={{
                flexDirection : 'row', 
                alignSelf : 'center',
                backgroundColor : '#1ff91f',
                marginTop : 30,
                borderRadius : 7,
                }}
                onPress = {()=> {
                  this.addToSavedPasswords()
                }}
                >
                
                <Text style={{
                  color : 'black', 
                  textAlign : 'center', 
                  fontSize : 20,
                  }}> 
                  Save      
                </Text>
    
                
                <Icon
                  name = 'save'
                  type = 'font-awesome'
                  color = 'black'
                  size = {25}
                />
              </TouchableOpacity>
              </View>
                
              
                {!this.state.adRewarded && (
              <AdMobBanner
              style = {{
                position: 'absolute',
                bottom: 80, 
              }}

            bannerSize = "smartBannerPortrait"
            setTestDeviceIDAsync = "EMULATOR"
            adUnitID = "ca-app-pub-1211516081114981/5167199993"
            // adUnitID = "ca-app-pub-3940256099942544/6300978111" 
            // test id of google
            // onDidFailToReceiveAdWithError = {(e) => alert(e)}
          />
          )}

          
     
            </ImageBackground>

            <Modal animationType = 'slide' transparent = {true} visible = {this.state.adModal} >
              <View style = {{
                justifyContent: 'center',
                flex: 1,
                alignItems: 'center',
                backgroundColor: '#55B4B0'
              }}>


                <Text style = {{fontSize: 25, textAlign: 'center', marginBottom: '10%'}}> Watch Video To Remove Ads? </Text>

                <View style = {{flexDirection: 'row-reverse', alignItems: 'center'}} >

                <TouchableOpacity 
                style = {{
                  justifyContent: 'center',
                  width: 100, 
                  backgroundColor: '#E89700',
                  borderRadius: 25,
                  alignSelf: 'center',
                  marginLeft: '5%'
                }} 
                onPress = {() => {
                  this.initRewards() 
                  this.setState({
                  adLoaded: true
                })}}>
                  <Text style = {{
                    textAlign: 'center',
                    fontSize: 18
                  }}> Watch </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                style = {{
                  justifyContent: 'center',
                  width: 100, 
                  backgroundColor: '#E89700',
                  borderRadius: 25,
                  alignSelf: 'center'}} 
                onPress = {() => this.setState({adModal: false})}>
                  <Text style = {{
                    textAlign: 'center',
                    fontSize: 18
                  }}> Cancel </Text>
                </TouchableOpacity>
              </View>

                  
              {this.state.adLoaded && (
                <ActivityIndicator size = 'large' color = '#FF00FF'/>
              )}

              </View>
            </Modal>
         
          </View>
        )
      }
  }
}

