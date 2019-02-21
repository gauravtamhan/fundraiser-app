import React, { Component } from 'react';
import { TouchableOpacity, TouchableHighlight, View, TextInput, StyleSheet, ScrollView, ActivityIndicator, Text, SafeAreaView } from 'react-native';
import { auth, database, provider } from '../../firebase';

export default class Signup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            firstname: '',
            lastname: '',

            error: '',
            loaderVisible: false,
        };
    }

    onSubmit() {
        const { email, password, firstname, lastname } = this.state;

        this.createAccount(email, password);
    }

    showLoader() {
        this.setState({ loaderVisible: true });
    }

    hideLoader() {
        this.setState({ loaderVisible: false });
    }

    clearError() {
        this.setState({ error: '' });
    }

    // writeUserData(userId, email, password) {
    //     console.log('WOOOOOOO')
    //     database.ref('users/' + userId).set({
    //         items: []
    //     });
    // }

    async createAccount(email, password) {
        console.log('got here')
        this.clearError();
        try {
            this.showLoader();
            await auth.createUserWithEmailAndPassword(email, password);
            console.log("Made new user");

            // const user = auth.currentUser
            // await this.writeUserData(user.uid, email, password)

            // Navigate to the Home page
            // this.props.navigation.navigate('Home')
            // console.log("Go awayyyyyyy")

        } catch (e) {
            this.hideLoader();
            this.setState({
                error: e.toString()
            })
        }

    }

    render() {

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <ScrollView keyboardDismissMode={'interactive'}>
                    <View style={stylesSheet.formContainer}>
                        <Text style={stylesSheet.title}>Welcome,</Text>
                        <Text style={stylesSheet.subtitle}>Create an Account</Text>

                        <View style={stylesSheet.extra}>
                            {
                                this.state.loaderVisible ? (
                                    <View>
                                        <ActivityIndicator size="large" color="#000" />
                                    </View>
                                ) : null
                            }

                            {
                                this.state.error !== '' ? (
                                    <View style={stylesSheet.errorBox}>
                                        <Text style={stylesSheet.errorText}>{this.state.error}</Text>
                                    </View>
                                ) : null
                            }
                        </View>

                        <TextInput
                            value={this.state.email}
                            autoCapitalize={'none'}
                            clearButtonMode={'while-editing'}
                            autoCorrect={false}
                            onChangeText={(email) => this.setState({ email })}
                            placeholder={'E-mail'}
                            style={[stylesSheet.input, { marginTop: 20 }]}
                        />
                        <TextInput
                            value={this.state.password}
                            autoCapitalize={'none'}
                            clearButtonMode={'while-editing'}
                            autoCorrect={false}
                            onChangeText={(password) => this.setState({ password })}
                            placeholder={'Password'}
                            secureTextEntry={true}
                            style={stylesSheet.input}
                        />

                        {/* <TextInput
                            value={this.state.firstname}
                            autoCapitalize={'none'}
                            clearButtonMode={'while-editing'}
                            autoCorrect={false}
                            onChangeText={(firstname) => this.setState({ firstname })}
                            placeholder={'First Name'}
                            style={stylesSheet.input}
                        />

                        <TextInput
                            value={this.state.lastname}
                            autoCapitalize={'none'}
                            clearButtonMode={'while-editing'}
                            autoCorrect={false}
                            onChangeText={(lastname) => this.setState({ lastname })}
                            placeholder={'Last Name'}
                            style={stylesSheet.input}
                        /> */}

                        <TouchableHighlight
                            style={stylesSheet.loginBtn}
                            underlayColor={'#17C177'}
                            onPress={this.onSubmit.bind(this)}>
                            <Text style={stylesSheet.buttonText}>Sign Up</Text>
                        </TouchableHighlight>

                    </View>
                </ScrollView>
            </SafeAreaView>
        );
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