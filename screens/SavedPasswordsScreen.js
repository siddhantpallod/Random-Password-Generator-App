import React from 'react';
import { Text, View,FlatList,TouchableOpacity,Clipboard, Platform } from 'react-native';
import {ListItem,Icon} from 'react-native-elements';
import MyHeader from '../components/MyHeader';
import db from '../config';
import firebase from 'firebase';

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
                allSavedIntentions: savedIntentions
            })
        })
    }

    componentDidMount(){
        this.getSavedPasswords()
    }


    componentWillUnmount(){
        this.savedRef()
    }

    onCancelPressed = (item) => {
        db.collection('savedPasswords').doc(item).delete().then( function() {
            alert("Document successfully deleted!");
        }).catch(function(error) {
            alert("Error removing document: ", error);
                })
            }

    // setTextIntoClipboard = async (item) => {
    //     await Clipboard.setString(item.savedPassword);
    //     alert("Password Copied!")
    // }

    
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
                    <Text style = {{textAlign: 'center'}}> {item.intention} </Text>

                    </View>
{/*  
                <TouchableOpacity onPress={this.setTextIntoClipboard(item)} 
                    activeOpacity={0.7} >
                        <Icon
                            name = 'copy'
                            type = 'feather'
                            color = 'black'
                        />
                </TouchableOpacity>  */}

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
                <View style = {{marginRight : 50}}>
                
                <Icon
                    name = 'shield'
                    type = 'font-awesome'
                    
                />
                </View>
            }
            

            rightElement = {
                <View style = {{flexDirection : 'row'}}>
                    
                    <View style = {{marginRight : 70}}>
                    
                    <Text style = {{textAlign: 'center'}}> {item.savedPassword} </Text>
                    <Text style = {{textAlign: 'center'}}> {item.intention} </Text>

                    </View>
{/*  
                <TouchableOpacity onPress={this.setTextIntoClipboard(item)} 
                    activeOpacity={0.7} >
                        <Icon
                            name = 'copy'
                            type = 'feather'
                            color = 'black'
                        />
                </TouchableOpacity>  */}

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
        ))

      
    )
    
    
    render() {
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
}
