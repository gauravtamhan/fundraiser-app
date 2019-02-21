import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { 
    createAppContainer, 
    createSwitchNavigator, 
    createStackNavigator, 
    createBottomTabNavigator 
} from 'react-navigation';
import Tasks from './src/screens/Tabs/Tasks';
import Profile from './src/screens/Tabs/Profile';
import Loading from './src/screens/Auth/Loading';
import Login from './src/screens/Auth/Login';
import Signup from './src/screens/Auth/Signup';
import { THEME_COLOR } from '@assets/colors';

const AuthStack = createStackNavigator(
    { 
        Login: {
            screen: Login,
            navigationOptions: {
                title: null,
                headerTransparent: true,
                headerTintColor: THEME_COLOR,
            }
        },
        Signup: {
            screen: Signup,
            navigationOptions: {
                title: null,
                headerTransparent: true,
                headerTintColor: THEME_COLOR,
            }
        },
    },
    {
        headerMode: 'float',
        // headerTransitionPreset: 'uikit',
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
            activeTintColor: THEME_COLOR,
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