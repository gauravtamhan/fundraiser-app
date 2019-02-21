import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, View, ActivityIndicator, Alert } from 'react-native';
import { auth, database, provider } from '../../firebase';
import { Content, Text, H1, Form, Item, Label, Input, Button } from 'native-base'
import { THEME_COLOR } from '@assets/colors';
import styles from '@assets/styles';

export default class Signup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            name: '',
            loaderVisible: false,
        };
    }

    onSubmit() {
        const { email, password, name } = this.state;

        this.createAccount(email, password, name);
    }

    showLoader() {
        this.setState({ loaderVisible: true });
    }

    hideLoader() {
        this.setState({ loaderVisible: false });
    }

    writeUserData(userId, name) {
        database.ref('users/' + userId).set({
            displayName: name
        });
    }

    async createAccount(email, password, name) {
        try {
            this.showLoader();
            await auth.createUserWithEmailAndPassword(email, password);
            await this.writeUserData(auth.currentUser.uid, name)
        } catch (e) {
            this.hideLoader();
            Alert.alert('Could Not Create Account', e.toString().substring(6))
        }

    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <Content contentContainerStyle={{ paddingHorizontal: 26 }}>
                    <View style={styles.formContainer}>
                        <H1 style={styles.title}>Create an Account</H1>

                        <View style={styles.extra}>
                            {
                                this.state.loaderVisible ? (
                                    <ActivityIndicator size="large" color="#000" />
                                ) : null
                            }
                        </View>

                        <Form>
                            <Item floatingLabel style={styles.item}>
                                <Label style={{ color: 'darkgray' }}>Full Name</Label>
                                <Input
                                    style={styles.input}
                                    value={this.state.name}
                                    // autoCapitalize={'none'}
                                    clearButtonMode={'while-editing'}
                                    autoCorrect={false}
                                    onChangeText={(name) => this.setState({ name })}
                                />
                            </Item>
                            <Item floatingLabel style={styles.item}>
                                <Label style={{ color: 'darkgray' }}>E-mail</Label>
                                <Input
                                    style={styles.input}
                                    value={this.state.email}
                                    autoCapitalize={'none'}
                                    clearButtonMode={'while-editing'}
                                    keyboardType={'email-address'}
                                    autoCorrect={false}
                                    onChangeText={(email) => this.setState({ email })}
                                />
                            </Item>
                            <Item floatingLabel style={styles.item}>
                                <Label style={{ color: 'darkgray' }}>Password</Label>
                                <Input
                                    style={styles.input}
                                    value={this.state.password}
                                    autoCapitalize={'none'}
                                    clearButtonMode={'while-editing'}
                                    autoCorrect={false}
                                    secureTextEntry
                                    onChangeText={(password) => this.setState({ password })}
                                />
                            </Item>
                            <View style={styles.bmContainer}>
                                <Button block style={{ backgroundColor: 'white', borderColor: THEME_COLOR, borderWidth: 1.6 }} onPress={this.onSubmit.bind(this)}>
                                    <Text style={styles.buttonTextTransparent}>Create Account</Text>
                                </Button>
                            </View>
                        </Form>

                    </View>
                </Content>
            </SafeAreaView>
        );
    }
}
