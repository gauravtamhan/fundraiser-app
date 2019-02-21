import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, View, ActivityIndicator, Alert } from 'react-native';
import { auth, database, provider } from '../../firebase';
import { Content, Text, H1, Form, Item, Label, Input, Button } from 'native-base'
import { THEME_COLOR } from '@assets/colors';

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
                    <View style={stylesSheet.formContainer}>
                        <H1 style={stylesSheet.title}>Create an Account</H1>
                        {/* <H1 style={stylesSheet.subtitle}>Login to continue</H1> */}

                        <View style={stylesSheet.extra}>
                            {
                                this.state.loaderVisible ? (
                                    <ActivityIndicator size="large" color="#000" />
                                ) : null
                            }
                        </View>

                        <Form>
                            <Item floatingLabel style={stylesSheet.item}>
                                <Label style={{ color: 'darkgray' }}>Full Name</Label>
                                <Input
                                    style={stylesSheet.input}
                                    value={this.state.name}
                                    // autoCapitalize={'none'}
                                    clearButtonMode={'while-editing'}
                                    autoCorrect={false}
                                    onChangeText={(name) => this.setState({ name })}
                                />
                            </Item>
                            <Item floatingLabel style={stylesSheet.item}>
                                <Label style={{ color: 'darkgray' }}>E-mail</Label>
                                <Input
                                    style={stylesSheet.input}
                                    value={this.state.email}
                                    autoCapitalize={'none'}
                                    clearButtonMode={'while-editing'}
                                    keyboardType={'email-address'}
                                    autoCorrect={false}
                                    onChangeText={(email) => this.setState({ email })}
                                />
                            </Item>
                            <Item floatingLabel style={stylesSheet.item}>
                                <Label style={{ color: 'darkgray' }}>Password</Label>
                                <Input
                                    style={stylesSheet.input}
                                    value={this.state.password}
                                    autoCapitalize={'none'}
                                    clearButtonMode={'while-editing'}
                                    autoCorrect={false}
                                    secureTextEntry
                                    onChangeText={(password) => this.setState({ password })}
                                />
                            </Item>
                            <View style={stylesSheet.bmContainer}>
                                <Button block style={{ backgroundColor: 'white', borderColor: THEME_COLOR, borderWidth: 1.6 }} onPress={this.onSubmit.bind(this)}>
                                    <Text style={stylesSheet.buttonTextTransparent}>Create Account</Text>
                                </Button>
                            </View>
                        </Form>

                    </View>
                </Content>
            </SafeAreaView>
        );
    }
}

const stylesSheet = StyleSheet.create({
    formContainer: {
        height: 700,
        paddingTop: 60,
        // backgroundColor: '#eff35e',
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
    item: {
        marginBottom: 20,
        marginLeft: 0
    },
    input: {
        paddingVertical: 12
    },
    bmContainer: {
        marginTop: 120,
        // backgroundColor: '#eff35e',
    },
    buttonText: {
        fontWeight: '500',
        color: '#FFF',
    },
    buttonTextTransparent: {
        fontWeight: '500',
        color: THEME_COLOR,
    },
    extra: {
        marginTop: 25,
        width: '100%',
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
});