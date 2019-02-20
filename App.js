import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import Auth from './src/screens/Auth';
import Home from './src/screens/Home';
import Loading from './src/screens/Loading';

const Navigator = createAppContainer(createSwitchNavigator(
    {
        Loading,
        Auth,
        Home
    },
    {
        initialRouteName: 'Loading'
    }
))

export default class App extends Component {

    render() {
        return (
            <Navigator />
        )
    }

}