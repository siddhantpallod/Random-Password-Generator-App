import React from 'react';
import { Text, View,FlatList,TouchableOpacity } from 'react-native';
import {ListItem,Icon} from 'react-native-elements';
import MyHeader from '../components/MyHeader';
import db from '../config';

export default class SavedPasswordsScreen extends React.Component {
    
    constructor(){
        super();
        this.state = {
            allSavedPasswords : [],
            doc_id : '',
            savedDate : []
        }
        this.savedRef = null
    }

    getSavedPasswords = () => {
        this.savedRef = db.collection('savedPasswords').where('userEmail','==',"siddhantpallod@gmail.com")
        .onSnapshot((snapshot) => {
            var savedPasswords = []
            var savedDate = []
            snapshot.docs.map((doc) => {
                this.state.doc_id = doc.id
                var details = doc.data()
                details['doc_id'] = doc.id
                savedPasswords.push(details)
                savedDate.push(doc.data().savedDate)
            })

            this.setState({
                allSavedPasswords : savedPasswords,
                savedDate : savedDate
            })
        })
    }

    componentDidMount(){
        this.getSavedPasswords()
    }

    componentWillUnmount(){
        this.savedRef()
    }

    onCancelPressed = () => {
        db.collection('savedPasswords').doc(this.state.doc_id).delete().then( function() {
            alert("Document successfully deleted!");
        }).catch(function(error) {
            alert("Error removing document: ", error);
                })
            }

    
    keyExtracter = (item,index) => index.toString()
    
    renderItem = ({item,I}) => (


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
                    
                    <Text> {item.savedPassword} </Text>
                    {/* <Text> {item.saveDate} </Text> */}

                    </View>

                    
                    <TouchableOpacity onPress = {()=> {
                        this.onCancelPressed()
                    }}>
                        <Icon
                            name = "x"
                            type = 'feather'
                            color = 'red'
                        />
                    </TouchableOpacity>
                    
                    
                </View>
            }
            
            
            title = 'Password:'
            subtitle = {item.date}

            bottomDivider
        />
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
                       <Text> You Have No Saved Passwords </Text>
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

