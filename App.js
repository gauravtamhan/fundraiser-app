import React, { Component } from 'react';
import { Icon } from 'native-base';
import { 
    createAppContainer, 
    createSwitchNavigator, 
    createStackNavigator, 
    createBottomTabNavigator 
} from 'react-navigation';
import { AppLoading } from 'expo';
import Tasks from './src/screens/Tabs/Donor/Tasks';
import AllTasks from './src/screens/Tabs/Fundraiser/AllTasks';
import ManageTasks from './src/screens/Tabs/Fundraiser/ManageTasks';
import ManageDetails from './src/screens/Tabs/Fundraiser/ManageDetails';
import Orgs from './src/screens/Tabs/Donor/Orgs';
import OrgDetails from './src/screens/Tabs/Donor/OrgDetails';
import TaskDetails from './src/screens/Tabs/Donor/TaskDetails';
import Payment from './src/screens/Tabs/Donor/Payment';
import Profile from './src/screens/Tabs/Donor/Profile';
import OrgProfile from './src/screens/Tabs/Fundraiser/OrgProfile';
import EditBio from './src/screens/Tabs/Fundraiser/EditBio';
import EditGoal from './src/screens/Tabs/Fundraiser/EditGoal';
import Loading from './src/screens/Auth/Loading';
import Login from './src/screens/Auth/Login';
import Signup from './src/screens/Auth/Signup';
import AddTaskModal from './src/screens/Modals/AddTaskModal';
import RequestTaskModal from './src/screens/Modals/RequestTaskModal';
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
                headerBackTitle: 'Back'
            },
        },
        TaskDetails: {
            screen: TaskDetails,
            navigationOptions: {
                title: null,
                headerBackTitle: 'Back',
                headerTintColor: THEME_COLOR,
            },
        },
        Payment: {
            screen: Payment,
            navigationOptions: {
                title: null,
                headerTintColor: THEME_COLOR,
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

const OrgTab = createStackNavigator(
    {
        Orgs: {
            screen: Orgs,
            navigationOptions: {
                title: 'Organizations',
                headerBackTitle: 'Back',
            },
        },
        OrgDetails: {
            screen: OrgDetails,
            navigationOptions: {
                title: null,
                headerTintColor: THEME_COLOR,
            },
        },
    },
    {
        headerMode: 'float',
        headerTransitionPreset: 'uikit',
        defaultNavigationOptions: {
            headerTitleStyle: styles.headerTitleStyle
        }
    }
);

const AllTasksTab = createStackNavigator(
    {
        AllTasks: {
            screen: AllTasks,
            navigationOptions: {
                title: 'Discover Tasks',
            },
        },
    },
    {
        headerMode: 'float',
        headerTransitionPreset: 'uikit',
        defaultNavigationOptions: {
            headerTitleStyle: styles.headerTitleStyle
        }
    }
);

const ManageTasksTab = createStackNavigator(
    {
        ManageTasks: {
            screen: ManageTasks,
            navigationOptions: {
                title: 'Manage Tasks',
                headerBackTitle: 'Back',
            },
        },
        ManageDetails: {
            screen: ManageDetails,
            navigationOptions: {
                title: null,
                headerTintColor: THEME_COLOR,
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

const OrgProfileTab = createStackNavigator(
    {
        OrgProfile: {
            screen: OrgProfile,
            navigationOptions: {
                title: 'Profile',
                headerBackTitle: 'Back',
            },
        },
        EditBio: {
            screen: EditBio,
            navigationOptions: {
                title: 'Edit Bio',
                headerTintColor: THEME_COLOR,
            },
        },
        EditGoal: {
            screen: EditGoal,
            navigationOptions: {
                title: 'Edit Goal Amount',
                headerTintColor: THEME_COLOR,
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
        OrgTab: {
            screen: OrgTab,
            navigationOptions: {
                tabBarLabel: 'Organizations',
                tabBarIcon: ({ tintColor, focused }) => (
                    <Icon name="business" style={{ color: tintColor, fontSize: 26 }} />
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
            // inactiveTintColor: 'rgb(175, 180, 192)'
            inactiveTintColor: 'rgb(190, 190, 204)'
        }
    }
);

const FundraiserTabs = createBottomTabNavigator(
    {
        AllTasksTab: {
            screen: AllTasksTab,
            navigationOptions: {
                tabBarLabel: 'Discover',
                tabBarIcon: ({ tintColor, focused }) => (
                    <Icon name="search" style={{ color: tintColor, fontSize: 26 }} />
                ),
            }
        },
        ManageTasksTab: {
            screen: ManageTasksTab,
            navigationOptions: {
                tabBarLabel: 'Manage',
                tabBarIcon: ({ tintColor, focused }) => (
                    <Icon name="bookmarks" style={{ color: tintColor, fontSize: 26 }} />
                ),
            }
        },
        OrgProfileTab: {
            screen: OrgProfileTab,
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
)

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

const FundraiserStack = createStackNavigator(
    {
        Main: {
            screen: FundraiserTabs
        },
        RequestTaskModal: {
            screen: RequestTaskModal,
        },
    },
    {
        mode: 'modal',
        headerMode: 'none',
    }
)

const Navigator = createAppContainer(createSwitchNavigator(
    {
        Loading,
        AuthStack,
        RootStack,
        FundraiserStack,
    },
    {
        initialRouteName: 'Loading'
    }
));

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = { loading: true };
    }

    async componentWillMount() {
        await Expo.Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        });
        this.setState({ loading: false });
    }

    render() {
        if (this.state.loading) {
            return <AppLoading />;
        }
        return (
            <Navigator />
        )
    }

}