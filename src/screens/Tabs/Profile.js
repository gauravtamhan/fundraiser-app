import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableHighlight, StyleSheet, AlertIOS } from 'react-native';
import { SafeAreaView } from 'react-navigation'
import { auth, database, provider } from '../../firebase';

export default class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {}

    }

    componentDidMount() {

    }

    warnLogout() {
        AlertIOS.alert(
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

                    <TouchableHighlight
                        style={stylesSheet.loginBtn}
                        underlayColor={'#17C177'}
                        onPress={this.warnLogout.bind(this)}>
                        <Text style={stylesSheet.buttonText}>Logout</Text>
                    </TouchableHighlight>
                    
            </ScrollView>
        )
    }
}

const stylesSheet = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    formContainer: {
        paddingHorizontal: 26,
        height: 700,
        paddingTop: 60,
        alignItems: 'flex-start',
    },
    input: {
        width: '100%',
        borderBottomWidth: 1,
        fontSize: 17,
        borderColor: 'rgb(216, 222, 225)',
        marginTop: 45,
        paddingVertical: 12,
    },
    loginBtn: {
        marginTop: 55,
        width: '100%',
        alignItems: 'center',
        paddingVertical: 16,
        backgroundColor: '#24CE84',
        borderRadius: 4,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#FFF',
    },
    extra: {
        marginTop: 25,
        width: '100%',
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorBox: {
        width: '100%',
        borderRadius: 4,
        paddingHorizontal: 14,
        paddingVertical: 12,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: 'rgb(255, 59, 48)',
    },
    errorText: {
        fontSize: 15,
        color: 'rgb(255, 59, 48)',
    },
    title: {
        fontWeight: '700',
        fontSize: 30,
        color: 'rgb(40, 40, 40)',
    },
    subtitle: {
        fontWeight: '700',
        fontSize: 30,
        color: 'rgb(186, 192, 196)',
    },
});