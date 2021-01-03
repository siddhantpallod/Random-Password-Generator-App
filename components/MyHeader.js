import React from 'react';
import {Header,Icon} from 'react-native-elements';

const MyHeader = props => {
        return (
            <Header
                // leftComponent = {
                //     <Icon
                //         name = 'bars'
                //         type = 'font-awesome'
                //         color = 'white'
                //         onPress = {()=> {
                //             this.props.navigation.toggleDrawer()
                //         }}
                //     />
                // }

                centerComponent = {{
                    text :  props.title,
                    style : {fontSize : 25}
                }}
            
                backgroundColor = "#ff6f61"
            />
        )
}

export default MyHeader;