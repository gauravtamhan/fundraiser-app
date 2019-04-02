import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { THEME_COLOR } from '@assets/colors';
import { auth, database, provider } from '@src/firebase';
import styles from '@assets/styles';


export default class Orgs extends Component {
    
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View>
                <Text>HI</Text>
            </View>)
    }
}