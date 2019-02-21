import React, { Component } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { Button, Text } from 'native-base';
import { auth, database, provider } from '../../firebase';
import { THEME_COLOR } from '@assets/colors';

export default class Profile extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: (
                <Button
                    transparent
                    onPress={navigation.getParam('warnLogout')}
                >
                    <Text style={{ color: THEME_COLOR, fontWeight: '500' }}>Logout</Text>
                </Button>
            ),
        };
    };
    
    constructor(props) {
        super(props);
        this.state = {}

    }

    componentDidMount() {
        this.props.navigation.setParams({ warnLogout: this.warnLogout });
    }

    warnLogout = () => {
        Alert.alert(
            'Are you sure you want to logout?',
            'You will be returned to the login screen.',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Logout',
                    onPress: () => this.logout(),
                    style: 'destructive',
                },
            ]
        );
    }

    async logout() {
        try {
            await auth.signOut();
            // Navigate to login view
            this.props.navigation.navigate('Login')
        } catch (error) {
            console.log(error);
        }

    }

    render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                 <Text>Profile Screen!</Text>
            </ScrollView>
        );
    }
}