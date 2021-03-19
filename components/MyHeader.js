import React from 'react';
import {Header,Icon} from 'react-native-elements';
import {RFValue} from 'react-native-responsive-fontsize';

const MyHeader = props => {
        return (
            <Header
                leftComponent = {
                    <Icon
                        name = 'bars'
                        type = 'font-awesome'
                        color = 'white'
                        onPress = {()=> {
                            props.navigation.toggleDrawer()
                        }}
                    />
                }

                centerComponent = {{
                    text :  props.title,
                    style : {fontSize : RFValue(20), fontWeight : 'bold'}
                }}
            
                backgroundColor = "#ff6561"
            />
        )
}

export default MyHeader;