import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, View, ActivityIndicator, Alert } from 'react-native';
import { auth, database, provider } from '../../firebase';
import { Content, Text, H1, Form, Item, Label, Input, Button } from 'native-base'
import { THEME_COLOR } from '@assets/colors';
import styles from '@assets/styles';

export default class Login extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            loaderVisible: false,
        };
    }

    onLogin() {
        const { email, password } = this.state;

        this.login(email, password);
    }

    showLoader() {
        this.setState({ loaderVisible: true });
    }

    hideLoader() {
        this.setState({ loaderVisible: false });
    }

    async login(email, pass) {
        try {
            this.showLoader();
            await auth.signInWithEmailAndPassword(email, pass);

            console.log("Logged In!");

            // Navigate to the Home page
            this.props.navigation.navigate('Tasks')

        } catch (e) {
            this.hideLoader();
            Alert.alert('Could Not Login', e.toString().substring(6))

        }

    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <Content contentContainerStyle={styles.contentPadding}>
                    <View style={styles.formContainer}>
                        <H1 style={styles.title}>Help Me Help You</H1>

                        <View style={styles.extra} />

                        <Form>
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
                                {/* <Label style={{ color: 'darkgray' }}>Password</Label> */}
                                <Input
                                    placeholder={'Password'}
                                    placeholderTextColor={'#9b9b9f'}
                                    style={styles.input}
                                    value={this.state.password}
                                    autoCapitalize={'none'}
                                    clearButtonMode={'while-editing'}
                                    autoCorrect={false}
                                    secureTextEntry
                                    onChangeText={(password) => this.setState({ password })}
                                />
                            </Item>
                            <View style={styles.extra}>
                                {
                                    this.state.loaderVisible ? (
                                        <ActivityIndicator size="large" color="#000" />
                                    ) : null
                                }
                            </View>
                            <View style={styles.bmContainer}>
                                <Button block style={{ backgroundColor: THEME_COLOR }} onPress={this.onLogin.bind(this)}>
                                    <Text style={styles.buttonText}>Login</Text>
                                </Button>
                                <View style={{ marginTop: 40, alignItems: 'center'}}>
                                    <Text>Don't have an account?</Text>
                                    <Button style={{alignSelf: 'center'}} transparent onPress={() => { this.props.navigation.navigate('Signup') }}>
                                        <Text style={styles.buttonTextTransparent}>Sign up</Text>
                                    </Button>
                                </View>
                            </View>
                        </Form>

                    </View>
                </Content>
            </SafeAreaView>
        );
    }
}