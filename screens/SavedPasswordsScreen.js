import React from 'react';
import { Text, View,FlatList } from 'react-native';
import db from '../config';

export default class SavedPasswordsScreen extends React.Component {
    
    constructor(){
        super();
        this.state = {
            allSavedPasswords : []
        }
    }

    getSavedPasswords = () => {
        db.collection('savedPasswords').get()
        .then() 
        .onSnapshot(snapshot => {
            var savedPasswords = []
            snapshot.forEach(doc => {
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

    keyExtracter = (item,index) => index.toString()
    
    renderItem = ({item,I}) => {
        return(
        <ListItem
            key = {I}
            leftElement = {
                <Icon
                    name = 'shield'
                    type = 'font-awesome'
                />
            }
            

            bottomDivider
        />
        )   
    }
    
    
    render() {
        return (
            <View>
                <FlatList
                    keyExtractor = {this.keyExtracter}
                    data = {this.state.allSavedPasswords}
                    renderItem = {this.renderItem}
                />
            </View>
        )
    }
}

