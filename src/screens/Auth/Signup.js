import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, View, ActivityIndicator, Alert } from 'react-native';
import { auth, database, provider } from '../../firebase';
import { Content, Text, H1, Form, Item, Label, Input, Button, Segment } from 'native-base'
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

    writeUserData(userId, x) {
        database.ref('users/' + userId).set({
            isDonor: x
        });
    }

    async createAccount(email, password, name, isDonor) {
        try {
            this.showLoader();
            await auth.createUserWithEmailAndPassword(email, password);
            // await this.writeUserData(auth.currentUser.uid, name)
            await auth.currentUser.updateProfile({
                displayName: name
            })
            await this.writeUserData(auth.currentUser.uid, isDonor)
        } catch (e) {
            this.hideLoader();
            Alert.alert('Could Not Create Account', e.toString().substring(6))
        }

    }

    render() {
        const { isDonor } = this.state;

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <Content contentContainerStyle={styles.contentPadding}>
                    <View style={styles.formContainer}>
                        <H1 style={styles.title}>Create an Account</H1>

                        <View style={styles.extra} />

                        <Form>
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
                            <View>
                                <Segment>
                                    <Button first active={isDonor} onPress={() => { this.setState({ isDonor: true}) }}>
                                        <Text>Donor</Text>
                                    </Button>
                                    <Button last active={!isDonor} onPress={() => { this.setState({ isDonor: false }) }}>
                                        <Text>Fundraiser</Text>
                                    </Button>
                                </Segment>
                            </View>
                            <View style={styles.extra}>
                                {
                                    this.state.loaderVisible ? (
                                        <ActivityIndicator size="large" color="#000" />
                                    ) : null
                                }
                            </View>
                            <View style={styles.bmContainer}>
                                <Button block style={{ backgroundColor: THEME_COLOR }} onPress={this.onSubmit.bind(this)}>
                                    <Text style={styles.buttonText}>Create Account</Text>
                                </Button>
                            </View>
                        </Form>

                    </View>
                </Content>
            </SafeAreaView>
        );
    }
}
