import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { 
    createAppContainer, 
    createSwitchNavigator, 
    createStackNavigator, 
    createBottomTabNavigator 
} from 'react-navigation';
import Tasks from './src/screens/Tasks';
import Profile from './src/screens/Profile';
import Loading from './src/screens/Loading';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';

const AuthStack = createStackNavigator(
    { 
        Login,
        Signup
    },
    {
        headerMode: 'float',
        headerTransitionPreset: 'uikit'
    }
);

const TasksTab = createStackNavigator(
    {
        Tasks: {
            screen: Tasks,
            navigationOptions: {
                title: 'Tasks',
            },
        }
    },
    {
        headerMode: 'float',
        headerTransitionPreset: 'uikit'
    }
);

const ProfileTab = createStackNavigator(
    {
        Profile: {
            screen: Profile,
            navigationOptions: {
                title: 'Profile',
            },
        }
    },
    {
        headerMode: 'float',
        headerTransitionPreset: 'uikit'
    }
);

const AppTabs = createBottomTabNavigator(
    {
        TasksTab: {
            screen: TasksTab,
            navigationOptions: {
                tabBarLabel: 'Tasks',
                tabBarIcon: ({ tintColor, focused }) => (
                    <Ionicons
                        name={focused ? 'ios-paper' : 'ios-paper'}
                        size={26}
                        style={{ color: tintColor }}
                    />
                ),
            }
        },
        ProfileTab: {
            screen: ProfileTab,
            navigationOptions: {
                tabBarLabel: 'Profile',
                tabBarIcon: ({ tintColor, focused }) => (
                    <Ionicons
                        name={focused ? 'ios-person' : 'ios-person'}
                        size={26}
                        style={{ color: tintColor }}
                    />
                ),
            }
        }
    },
    {
        animationEnabled: true,
        tabBarOptions: {
            labelStyle: { fontWeight: '500' },
            // activeTintColor: 'tomato',
            // inactiveTintColor: 'darkgray',
        }
    }
);

const Navigator = createAppContainer(createSwitchNavigator(
    {
        Loading,
        AuthStack,
        AppTabs
    },
    {
        initialRouteName: 'Loading'
    }
));

export default class App extends Component {

    render() {
        return (
            <Navigator />
        )
    }

}