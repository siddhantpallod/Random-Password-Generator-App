import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs'
import GenerateScreen from '../screens/GenerateScreen';

export const AppTabNavigator = createBottomTabNavigator({
    Generate : {screen : GenerateScreen,
        navigationOptions : {
            tabBarVisible : false
        }
    }
})