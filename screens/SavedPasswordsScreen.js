import React from 'react';
import { Text, View,FlatList } from 'react-native';
import {ListItem,Icon} from 'react-native-elements';
import db from '../config';

export default class SavedPasswordsScreen extends React.Component {
    
    constructor(){
        super();
        this.state = {
            allSavedPasswords : []
        }
        this.savedRef = null
    }

    getSavedPasswords = () => {
        this.savedRef = db.collection('savedPasswords').where('userEmail','==',"siddhantpallod@gmail.com")
        .onSnapshot((snapshot) => {
            var savedPasswords = []
            snapshot.forEach((doc) => {
                var details = doc.data()
                details['doc_id'] = doc.id
                savedPasswords.push(details)
            })

            this.setState({
                allSavedPasswords : savedPasswords
            })
        })
    }

    componentDidMount(){
        this.getSavedPasswords()
    }

    componentWillUnmount(){
        this.savedRef()
    }

    keyExtracter = (item,index) => index.toString()
    
    renderItem = ({item,I}) => (
        
        <ListItem
            key = {I}
            leftElement = {
                <Icon
                    name = 'shield'
                    type = 'font-awesome'
                />
            }

            rightElement = {
                <Text> {item.savedPassword} </Text>
            }
            
            title = 'Password:'
            subtitle = {item}

            bottomDivider
        />
    )
    
    
    render() {
        return (
            <View style={{flex : 1}}>
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

