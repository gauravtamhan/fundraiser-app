import React, { Component } from 'react';
import { Icon } from 'native-base';
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
import AddTaskModal from './src/screens/Modals/AddTaskModal';
import { THEME_COLOR } from '@assets/colors';
import styles from '@assets/styles';

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
                title: 'My Tasks',
            },
        }
    },
    {
        headerMode: 'float',
        headerTransitionPreset: 'uikit',
        defaultNavigationOptions: {
            headerTitleStyle: styles.headerTitleStyle
        }
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
        headerTransitionPreset: 'uikit',
        defaultNavigationOptions: {
            headerTitleStyle: styles.headerTitleStyle
        }
    }
);

const AppTabs = createBottomTabNavigator(
    {
        TasksTab: {
            screen: TasksTab,
            navigationOptions: {
                tabBarLabel: 'My Tasks',
                tabBarIcon: ({ tintColor, focused }) => (
                    <Icon name="paper" style={{ color: tintColor, fontSize: 26 }} />
                ),
            }
        },
        ProfileTab: {
            screen: ProfileTab,
            navigationOptions: {
                tabBarLabel: 'Profile',
                tabBarIcon: ({ tintColor, focused }) => (
                    <Icon name="person" style={{ color: tintColor, fontSize: 26 }} />
                ),
            }
        }
    },
    {
        animationEnabled: true,
        tabBarOptions: {
            // showLabel: false,
            labelStyle: { fontWeight: '500' },
            activeTintColor: THEME_COLOR,
            inactiveTintColor: 'rgb(175, 180, 192)'
        }
    }
);

const RootStack = createStackNavigator(
    {
        Main: {
            screen: AppTabs,
        },
        AddTaskModal: {
            screen: AddTaskModal,
        },
    },
    {
        mode: 'modal',
        headerMode: 'none',
    }
);

const Navigator = createAppContainer(createSwitchNavigator(
    {
        Loading,
        AuthStack,
        RootStack,
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