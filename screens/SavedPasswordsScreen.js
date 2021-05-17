import React from 'react';
import { Text, View,FlatList,TouchableOpacity,Clipboard, Platform, ToastAndroid, ActivityIndicator } from 'react-native';
import {ListItem,Icon} from 'react-native-elements';
import MyHeader from '../components/MyHeader';
import db from '../config';
import firebase from 'firebase';
import {RFValue} from 'react-native-responsive-fontsize';
import {AdMobBanner, setTestDeviceIDAsync} from 'expo-ads-admob';


export default class SavedPasswordsScreen extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            email : firebase.auth().currentUser.email,
            allSavedPasswords : [],
            doc_id : '',
            savedDate : [],
            clipboardText: "",
            allSavedIntentions : [],
            loading: true
        }
        this.savedRef = null
    }

    getSavedPasswords = () => {
        this.savedRef = db.collection('savedPasswords').where('userEmail','==',this.state.email )
        .onSnapshot((snapshot) => {
            var savedPasswords = []
            var savedDate = []
            var savedIntentions = []
            snapshot.docs.map((doc) => {
                this.state.doc_id = doc.id
                var details = doc.data()
                details['doc_id'] = doc.id
                savedIntentions.push(doc.data().intention)
                savedPasswords.push(details)
                savedDate.push(doc.data().savedDate)
            })

            this.setState({
                allSavedPasswords : savedPasswords,
                savedDate : savedDate,
                allSavedIntentions: savedIntentions,
                loading: false
            })
        })
    }

    componentDidMount(){
        this.getSavedPasswords()
        this.setState({
            loading: true
        })
    }


    componentWillUnmount(){
        this.savedRef()
    }

    onDeletePressed = (item) => {
        db.collection('savedPasswords').doc(item).delete().then( function() {
            alert("Document successfully deleted!");
        }).catch(function(error) {
            alert("Error removing document: ", error);
                })
            }

    setTextIntoClipboard = async (item) => {
        await Clipboard.setString(item.savedPassword);
        if(Platform.OS == 'web'){
        alert("Password Copied!")
        }
        else if(Platform.OS == 'android'){
            ToastAndroid.show('Password Copied!', ToastAndroid.SHORT)
        }
    }

    
    keyExtracter = (item,index) => index.toString()
    
    renderItem = ({item,I}) => (

        (Platform.OS == 'web' ? (
            <ListItem
            key = {I}
            leftElement = {
                <View style = {{marginRight : 50}}>
                
                <Icon
                    name = 'shield'
                    type = 'font-awesome'
                    
                />
                </View>
            }
            

            rightElement = {
                <View style = {{flexDirection : 'row'}}>
                    
                    <View style = {{marginRight : 850}}>
                    
                    <Text style = {{textAlign: 'center'}}> {item.savedPassword} </Text>
                    <Text style = {{textAlign: 'center', opacity: 0.5}}> {item.intention} </Text>

                    </View>
 
                <TouchableOpacity onPress={() => this.setTextIntoClipboard(item)} 
                    activeOpacity={0.7} >
                        <Icon
                            name = 'copy'
                            type = 'feather'
                            color = 'black'
                        />
                </TouchableOpacity> 

{/*                     
                    <TouchableOpacity onPress = {()=> {
                        this.onCancelPressed(item.docId)
                    }}>
                        <Icon
                            name = "trash"
                            type = 'feather'
                            color = 'red'
                        />
                    </TouchableOpacity>
                     */}
                    
                </View>
            }
            
            
            title = 'Password:'
            subtitle = 'Purpose:'

            bottomDivider
        />
        ) : (
            <ListItem
            key = {I}
            leftElement = {
                <View style = {{marginRight : 5}}>
                
                <Icon
                    name = 'shield'
                    type = 'font-awesome'
                    
                />
                </View>
            }
            

            rightElement = {
                <View style = {{flexDirection : 'row'}}>
                    
                    <View style = {{marginRight : 70}}>
                    
                    <Text style = {{textAlign: 'center', fontSize: RFValue(17)}}> {item.savedPassword} </Text>
                    <Text style = {{textAlign: 'center', fontSize: RFValue(15), opacity: 0.5}}> {item.intention} </Text>

                    </View>
 
                <TouchableOpacity onPress={() =>this.setTextIntoClipboard(item)} 
                    activeOpacity={0.7} >
                        <Icon
                            name = 'copy'
                            type = 'feather'
                            color = 'black'
                        />
                </TouchableOpacity> 

                    
                    {/* <TouchableOpacity onPress = {()=> {
                        this.onCancelPressed(item.docId)
                    }}>
                        <Icon
                            name = "trash"
                            type = 'feather'
                            color = 'red'
                        />
                    </TouchableOpacity> */}
                    
                    
                </View>
            }
            
            
            title = 'Pass:'
            subtitle = 'Purpose:'

            bottomDivider
            />
        ))

      
    )
    
    
    render() {
        if(Platform.OS == 'web'){
        return (
            <View style={{flex : 1}}>

                <MyHeader
                    title = "Saved Passwords"
                    navigation = {this.props.navigation}
                />
                {this.state.allSavedPasswords.length === 0 ?
                (
                    <View>
                       <Text style = {{
                           textAlign: 'center',
                           fontSize: 30,
                           justifyContent: 'center'
                       }} > You Have No Saved Passwords. </Text>
                        </View>
                ) : (
                
                <FlatList
                    keyExtractor = {this.keyExtracter}
                    data = {this.state.allSavedPasswords}
                    renderItem = {this.renderItem}
                />
                )
                 }

            </View>
                
        )
        }
        else{
            return (
                <View style={{flex : 1}}>
    
                    <MyHeader
                        title = "Saved Passwords"
                        navigation = {this.props.navigation}
                    />

                    {this.state.allSavedPasswords.length === 0 ?
                    (
                        <View>
                           <Text style = {{
                               textAlign: 'center',
                               fontSize: 30,
                               justifyContent: 'center'
                           }} > You Have No Saved Passwords. </Text>
                            </View>
                    ) : (

                    
                    
                    <FlatList
                        keyExtractor = {this.keyExtracter}
                        data = {this.state.allSavedPasswords}
                        renderItem = {this.renderItem}
                    />
                    )}

                    {this.state.loading && (
                        <ActivityIndicator size = 'large' color = '#FF00FF'/>
                    )}
                        
                        <AdMobBanner
                        bannerSize = "smartBannerPortrait"
                        setTestDeviceIDAsync = "EMULATOR"
                        adUnitID = "ca-app-pub-1211516081114981/5167199993"
                        // adUnitID = "ca-app-pub-3940256099942544/6300978111" 
                        // test id of google
                        // onDidFailToReceiveAdWithError = {(e) => alert(e)}
                    />

                  
    
                </View>
                    
            )
        }
    }
}

