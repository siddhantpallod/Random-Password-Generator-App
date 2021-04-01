import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import GenerateScreen from '../screens/GenerateScreen';
import SavedPasswordsScreen from '../screens/SavedPasswordsScreen';
import CustomSideBarMenu from './CustomSideBarMenu';
import {AppTabNavigator} from './AppTabNavigator';
import SettingsScreen from '../screens/SettingsScreen';


export const AppDrawerNavigator = createDrawerNavigator({
    Home : {
        screen : AppTabNavigator
    },
    SavedPasswords : {
        screen : SavedPasswordsScreen
    },
    Settings: {
        screen: SettingsScreen
    }
 
},

{
    contentComponent : CustomSideBarMenu
},

    {
    initialRouteName : 'Home'
    },
    
)