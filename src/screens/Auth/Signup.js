import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, View, ActivityIndicator, Alert } from 'react-native';
import { auth, database, provider } from '../../firebase';
import { Content, Text, H1, Form, Item, Label, Input, Button, Segment } from 'native-base'
import { THEME_COLOR } from '@assets/colors';
import styles from '@assets/styles';
import { Permissions, Notifications } from 'expo';

export default class Signup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            name: '',
            loaderVisible: false,
            isDonor: true,
        };
    }

    onSubmit() {
        const { email, password, name, isDonor } = this.state;

        this.createAccount(email, password, name, isDonor);
    }

    showLoader() {
        this.setState({ loaderVisible: true });
    }

    hideLoader() {
        this.setState({ loaderVisible: false });
    }

    writeUserData(userId, isDonor, name, bio, email, token) {
        // Will add notification token to here
        database.ref('users/' + userId).set({
            isDonor: isDonor,
            name: name,
            bio: bio,
            email: email,
            token: token
        });
    }

    async createAccount(email, password, name, isDonor) {
        try {
            this.showLoader();
            await auth.createUserWithEmailAndPassword(email, password);
            await auth.currentUser.updateProfile({
                displayName: name
            })
            const bio = 'A new organization looking to assist members within the community.'

            const token = await this.registerForPushNotificationsAsync();
            console.log("token: " + token)
            await this.writeUserData(auth.currentUser.uid, isDonor, name, bio, email, token);
        } catch (e) {
            this.hideLoader();
            Alert.alert('Could Not Create Account', e.toString().substring(6))
        }
    }

    async registerForPushNotificationsAsync() {
        const { status: existingStatus } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;
      
        // only ask if permissions have not already been determined, because
        // iOS won't necessarily prompt the user a second time.
        if (existingStatus !== 'granted') {
            // Android remote notification permissions are granted during the app
            // install, so this will only ask on iOS
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }
      
        // Stop here if the user did not grant permissions
        if (finalStatus !== 'granted') {
            return;
        }
      
        // Get the token that uniquely identifies this device
        let token = await Notifications.getExpoPushTokenAsync();
      
        // POST the token to your backend server from where you can retrieve it to send push notifications.
        // await this.writeUserData(userId, isDonor, name, bio, email, token);
        return token;
    }

    render() {
        const { isDonor } = this.state;

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <Content contentContainerStyle={[styles.contentPadding, { flex: 1 }]}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <H1 style={styles.title}>Create an Account</H1>
                    </View>

                    <View style={{ flex: 4, justifyContent: 'space-between' }}>
                        <Form style={{marginTop: 20}}>
                            <View style={{marginBottom: 50}}>
                                <Segment style={{ backgroundColor: 'transparent' }}>
                                    <Button
                                        style={{
                                            height: 50,
                                            flex: 1,
                                            justifyContent: 'center',
                                            backgroundColor: isDonor ? THEME_COLOR : undefined,
                                            borderColor: THEME_COLOR,
                                        }}
                                        first
                                        active={isDonor}
                                        onPress={() => { this.setState({ isDonor: true }) }}
                                    >
                                        <Text style={{ fontSize: 17, fontWeight: '600', color: isDonor ? 'white' : THEME_COLOR }}>Donor</Text>
                                    </Button>
                                    <Button
                                        style={{
                                            height: 50,
                                            flex: 1,
                                            justifyContent: 'center',
                                            backgroundColor: !isDonor ? THEME_COLOR : undefined,
                                            borderColor: THEME_COLOR,
                                        }}
                                        last
                                        active={!isDonor}
                                        onPress={() => { this.setState({ isDonor: false }) }}
                                    >
                                        <Text style={{ fontSize: 17, fontWeight: '600', color: !isDonor ? 'white' : THEME_COLOR }}>Organization</Text>
                                    </Button>
                                </Segment>
                            </View>
                            <Item rounded style={styles.roundedItem}>
                                <Input
                                    placeholder={'Full Name'}
                                    placeholderTextColor={'#9b9b9f'}
                                    value={this.state.name}
                                    autoCapitalize={'words'}
                                    clearButtonMode={'while-editing'}
                                    autoCorrect={false}
                                    onChangeText={(name) => this.setState({ name })}
                                />
                            </Item>
                            <Item rounded style={styles.roundedItem}>
                                <Input
                                    placeholder={'E-mail'}
                                    placeholderTextColor={'#9b9b9f'}
                                    value={this.state.email}
                                    autoCapitalize={'none'}
                                    clearButtonMode={'while-editing'}
                                    keyboardType={'email-address'}
                                    autoCorrect={false}
                                    onChangeText={(email) => this.setState({ email })}
                                />
                            </Item>
                            <Item rounded style={styles.roundedItem}>
                                <Input
                                    placeholder={'Password'}
                                    placeholderTextColor={'#9b9b9f'}
                                    value={this.state.password}
                                    autoCapitalize={'none'}
                                    clearButtonMode={'while-editing'}
                                    autoCorrect={false}
                                    secureTextEntry
                                    onChangeText={(password) => this.setState({ password })}
                                />
                            </Item>
                        </Form>
                        {
                            this.state.loaderVisible ? (
                                <ActivityIndicator size="large" color="#000" />
                            ) : null
                        }
                    </View>
                    <View style={{ flex: 2, justifyContent: 'center'}}>
                        <Button rounded style={styles.roundedBtn} onPress={this.onSubmit.bind(this)}>
                            <Text style={styles.buttonText}>Create Account</Text>
                        </Button>
                    </View>
                    
                </Content>
            </SafeAreaView>
        );
    }
}
